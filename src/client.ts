import {ChannelCredentials} from '@grpc/grpc-js';
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
  grpcClient: services.IServerReflectionClient;
  constructor(url: string, credentials: ChannelCredentials, options?: object) {
    this.grpcClient = new services.ServerReflectionClient(
      url,
      credentials,
      options
    );
  }

  listServices(): Promise<string[] | void[]> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasListServicesResponse()) {
          const services = response
            .getListServicesResponse()
            ?.getServiceList()
            .map(svc => {
              return svc.getName();
            });
          resolve(services);
        } else {
          reject(Error());
        }
      }

      const request = new ServerReflectionRequest();
      request.setListServices('*');

      const grpcCall = this.grpcClient.serverReflectionInfo({});
      grpcCall.on('data', dataCallback);
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

  private async resolveFileDescriptorSet(
    fileDescriptorProtoBytes: Array<Uint8Array | string> | undefined
  ): Promise<Root> {
    const fileDescriptorSet = FileDescriptorSet.create();
    const fileDescriptorProtos = await this.resolveDescriptorRecursive(
      fileDescriptorProtoBytes as Array<Uint8Array | string>
    );
    set(fileDescriptorSet, 'file', fileDescriptorProtos);
    return getDescriptorRootFromDescriptorSet(fileDescriptorSet);
  }

  private async resolveDescriptorRecursive(
    fileDescriptorProtoBytes: Array<Uint8Array | string>
  ): Promise<IFileDescriptorProto[]> {
    let fileDescriptorProtos: IFileDescriptorProto[] = [];
    for (const descriptorByte of fileDescriptorProtoBytes) {
      const fileDescriptorProto = FileDescriptorProto.decode(
        descriptorByte as Uint8Array
      ) as IFileDescriptorProto;
      if (fileDescriptorProto.dependency) {
        const dependencies = fileDescriptorProto.dependency as Array<string>;
        for (const dep of dependencies) {
          const depProtoBytes = await this.getFileByFilename(dep);
          const protoDependencies = await this.resolveDescriptorRecursive(
            depProtoBytes as Array<Uint8Array | string>
          );
          fileDescriptorProtos = fileDescriptorProtos.concat(protoDependencies);
        }
      }
      fileDescriptorProtos.push(fileDescriptorProto);
    }
    return fileDescriptorProtos;
  }

  private getFileContainingSymbol(
    symbol: string
  ): Promise<Array<Uint8Array | string> | undefined> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          resolve(
            response.getFileDescriptorResponse()?.getFileDescriptorProtoList()
          );
        } else {
          reject(Error());
        }
      }

      const request = new ServerReflectionRequest();
      request.setFileContainingSymbol(symbol);

      const grpcCall = this.grpcClient.serverReflectionInfo({});
      grpcCall.on('data', dataCallback);
      grpcCall.write(request);
      grpcCall.end();
    });
  }

  private getFileByFilename(
    symbol: string
  ): Promise<Array<Uint8Array | string> | undefined> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          resolve(
            response.getFileDescriptorResponse()?.getFileDescriptorProtoList()
          );
        } else {
          reject(Error());
        }
      }

      const request = new ServerReflectionRequest();
      request.setFileByFilename(symbol);

      const grpcCall = this.grpcClient.serverReflectionInfo({});
      grpcCall.on('data', dataCallback);
      grpcCall.write(request);
      grpcCall.end();
    });
  }
}
