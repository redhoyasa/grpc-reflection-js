import * as grpc from 'grpc';
import {getDescriptorRoot} from './descriptor';
import * as services from './reflection_grpc_pb';
import {
  ServerReflectionRequest,
  ServerReflectionResponse,
} from './reflection_pb';

export class Client {
  private readonly grpcClient: services.IServerReflectionClient;
  constructor(
    url: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  ) {
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

      const callGrpc = this.grpcClient.serverReflectionInfo({});
      callGrpc.on('data', dataCallback);
      callGrpc.write(request);
      callGrpc.end();
    });
  }

  fileContainingSymbol(symbol: string): Promise<grpc.GrpcObject> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: ServerReflectionResponse) {
        if (response.hasFileDescriptorResponse()) {
          const root = getDescriptorRoot(
            response.getFileDescriptorResponse()?.getFileDescriptorProtoList()
          );
          const res = grpc.loadObject(root);
          resolve(res);
        } else {
          reject(Error());
        }
      }

      const request = new ServerReflectionRequest();
      request.setFileContainingSymbol(symbol);

      const callGrpc = this.grpcClient.serverReflectionInfo({});
      callGrpc.on('data', dataCallback);
      callGrpc.write(request);
      callGrpc.end();
    });
  }
}
