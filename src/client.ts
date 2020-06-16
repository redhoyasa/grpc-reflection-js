import * as loader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import get from 'lodash.get';
import {getDescriptorRoot} from './descriptor';

const PROTO_PATH =
  __dirname + '/../static/grpc/reflection/v1alpha/reflection.proto';
const PACKAGE_NAME = 'grpc.reflection.v1alpha';
const SERVICE_NAME = 'ServerReflection';

export class Client {
  private readonly grpcClient: grpc.Client;
  constructor(
    url: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  ) {
    const packageDefinition = loader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition); // eslint-disable-line no-console
    const reflection = get(protoDescriptor, PACKAGE_NAME);
    const reflectionService = get(reflection, SERVICE_NAME);
    this.grpcClient = new reflectionService(url, credentials, options);
  }

  listServices(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: any) {
        if ('list_services_response' in response) {
          const services = response.list_services_response.service.map(
            (svc: {name: string}) => {
              return svc.name;
            }
          );
          resolve(services);
        } else {
          reject(Error());
        }
      }

      const input = {
        list_services: '*',
      };
      const client = this.grpcClient as any;
      const callGrpc = client['ServerReflectionInfo']({});
      callGrpc.on('data', dataCallback);
      callGrpc.write(input);
      callGrpc.end();
    });
  }

  fileContainingSymbol(symbol: string): Promise<grpc.GrpcObject> {
    return new Promise((resolve, reject) => {
      function dataCallback(response: any) {
        if ('file_descriptor_response' in response) {
          const root = getDescriptorRoot(
            response.file_descriptor_response.file_descriptor_proto
          );
          const res = grpc.loadObject(root);
          resolve(res);
        } else {
          reject(Error());
        }
      }

      const input = {
        file_containing_symbol: symbol,
      };
      const client = this.grpcClient as any;
      const callGrpc = client['ServerReflectionInfo']({});
      callGrpc.on('data', dataCallback);
      callGrpc.write(input);
      callGrpc.end();
    });
  }
}
