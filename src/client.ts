import {ChannelCredentials, Metadata, ServiceError} from '@grpc/grpc-js';
import {getDescriptorRootFromDescriptorSet} from './descriptor';
import * as services from './reflection_grpc_pb';
import {
  ServerReflectionRequest,
  ServerReflectionResponse,
} from './reflection_pb';
import {Root} from 'protobufjs';
import {
  FileDescriptorSet,
  IFileDescriptorProto,
  FileDescriptorProto,
} from 'protobufjs/ext/descriptor';
import set from 'lodash.set';

export class Client {
  metadata: Metadata;
  grpcClient: services.IServerReflectionClient;
  private fileDescriptorCache: Map<string, IFileDescriptorProto> = new Map();
  constructor(
    url: string,
    credentials: ChannelCredentials,
    options?: object,
    metadata?: Metadata
  ) {
    this.fileDescriptorCache = new Map();
    this.metadata = metadata || new Metadata();
    this.grpcClient = new services.ServerReflectionClient(
      url,
      credentials,
      options
    );
  }

  listServices(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasListServicesResponse()) {
          const services = response
            .getListServicesResponse()
            ?.getServiceList()
            .map(svc => {
              return svc.getName();
            });
          resolve(services || []);
        } else {
          reject(Error());
        }
      }

      function errorCallback(e: ServiceError) {
        reject(e);
      }

      const request = new ServerReflectionRequest();
      request.setListServices('*');

      const grpcCall = this.grpcClient.serverReflectionInfo(this.metadata);
      grpcCall.on('data', dataCallback);
      grpcCall.on('error', errorCallback);
      grpcCall.write(request);
      grpcCall.end();
    });
  }

  fileContainingSymbol(symbol: string): Promise<Root> {
    return new Promise((resolve, reject) => {
      this.getFileContainingSymbol(symbol)
        .then(val => resolve(this.resolveFileDescriptorSet(val)))
        .catch(err => reject(err));
    });
  }

  fileByFilename(filename: string): Promise<Root> {
    return new Promise((resolve, reject) => {
      this.getFilesByFilenames([filename])
        .then(val => resolve(this.resolveFileDescriptorSet(val)))
        .catch(err => reject(err));
    });
  }

  private async resolveFileDescriptorSet(
    fileDescriptorProtos: Array<IFileDescriptorProto> | undefined
  ): Promise<Root> {
    const fileDescriptorMap = await this.resolveDescriptorRecursive(
      fileDescriptorProtos
    );
    const fileDescriptorSet = FileDescriptorSet.create();
    set(fileDescriptorSet, 'file', Array.from(fileDescriptorMap.values()));
    return getDescriptorRootFromDescriptorSet(fileDescriptorSet);
  }

  private async resolveDescriptorRecursive(
    fileDescriptorProtos: Array<IFileDescriptorProto> = [],
    fileDescriptorMap: Map<string, IFileDescriptorProto> = new Map()
  ): Promise<Map<string, IFileDescriptorProto>> {
    await Promise.all(
      fileDescriptorProtos.map(async fileDescriptorProto => {
        if (fileDescriptorMap.has(fileDescriptorProto.name as string)) {
          return;
        } else {
          fileDescriptorMap.set(
            fileDescriptorProto.name as string,
            fileDescriptorProto
          );
        }

        const dependencies = (fileDescriptorProto.dependency || []).filter(
          (dependency: string) => !fileDescriptorMap.has(dependency)
        );
        if (dependencies.length) {
          await this.resolveDescriptorRecursive(
            await this.getFilesByFilenames(dependencies),
            fileDescriptorMap
          );
        }
      })
    );

    return fileDescriptorMap;
  }

  private getFileContainingSymbol(
    symbol: string
  ): Promise<Array<IFileDescriptorProto> | undefined> {
    const fileDescriptorCache = this.fileDescriptorCache;
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          const fileDescriptorProtoBytes = (response
            .getFileDescriptorResponse()
            ?.getFileDescriptorProtoList() || []) as Array<Uint8Array>;

          resolve(
            fileDescriptorProtoBytes.map(descriptorByte => {
              const fileDescriptorProto = FileDescriptorProto.decode(
                descriptorByte
              ) as IFileDescriptorProto;

              fileDescriptorCache.set(
                fileDescriptorProto.name as string,
                fileDescriptorProto
              );

              return fileDescriptorProto;
            })
          );
        } else {
          reject(Error());
        }
      }

      function errorCallback(e: ServiceError) {
        reject(e);
      }

      const request = new ServerReflectionRequest();
      request.setFileContainingSymbol(symbol);

      const grpcCall = this.grpcClient.serverReflectionInfo(this.metadata);
      grpcCall.on('data', dataCallback);
      grpcCall.on('error', errorCallback);
      grpcCall.write(request);
      grpcCall.end();
    });
  }

  private getFilesByFilenames(
    symbols: string[]
  ): Promise<Array<IFileDescriptorProto> | undefined> {
    const result: Array<IFileDescriptorProto> = [];
    const fileDescriptorCache = this.fileDescriptorCache;
    const symbolsToFetch = symbols.filter(symbol => {
      const cached = fileDescriptorCache.get(symbol);
      if (cached) {
        result.push(cached);
        return false;
      }
      return true;
    });

    if (symbolsToFetch.length === 0) {
      return Promise.resolve(result);
    }

    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          response
            .getFileDescriptorResponse()
            ?.getFileDescriptorProtoList()
            ?.forEach(descriptorByte => {
              if (descriptorByte instanceof Uint8Array) {
                const fileDescriptorProto = FileDescriptorProto.decode(
                  descriptorByte
                ) as IFileDescriptorProto;

                fileDescriptorCache.set(
                  fileDescriptorProto.name as string,
                  fileDescriptorProto
                );

                result.push(fileDescriptorProto);
              }
            });
        } else {
          reject(Error());
        }
      }

      function errorCallback(e: ServiceError) {
        reject(e);
      }

      const grpcCall = this.grpcClient.serverReflectionInfo(this.metadata);
      grpcCall.on('data', dataCallback);
      grpcCall.on('error', errorCallback);
      grpcCall.on('end', () => {
        resolve(result);
      });

      const request = new ServerReflectionRequest();
      symbolsToFetch.forEach(symbol => {
        grpcCall.write(request.setFileByFilename(symbol));
      });

      grpcCall.end();
    });
  }
}
