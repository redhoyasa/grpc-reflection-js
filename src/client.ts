import {ChannelCredentials} from '@grpc/grpc-js';
import {getDescriptorRoot} from './descriptor';
import * as services from './reflection_grpc_pb';
import {
  ServerReflectionRequest,
  ServerReflectionResponse,
} from './reflection_pb';
import {Root} from 'protobufjs';

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
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          const root = getDescriptorRoot(
            response.getFileDescriptorResponse()?.getFileDescriptorProtoList()
          );
          resolve(root);
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
}
