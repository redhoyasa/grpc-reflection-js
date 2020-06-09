import * as loader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import get from 'lodash.get';
import {getDescriptorRoot} from './descriptor';

const PROTO_PATH =
  __dirname + '/../static/grpc/reflection/v1alpha/reflection.proto';
const PACKAGE_NAME = 'grpc.reflection.v1alpha';
const SERVICE_NAME = 'ServerReflection';

export function createReflectionClient(
  url: string,
  credentials: grpc.ChannelCredentials,
  options?: object
): grpc.Client {
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
  const client = new reflectionService(url, credentials, options);
  return client;
}

export async function listServices(client: any) {
  return new Promise((resolve, reject) => {
    function dataCallback(response: any) {
      if ('list_services_response' in response) {
        resolve(response.list_services_response.service);
      } else {
        reject(Error());
      }
    }

    const input = {
      list_services: '*',
    };
    const callGrpc = client['ServerReflectionInfo']({});
    callGrpc.on('data', dataCallback);
    callGrpc.write(input);
    callGrpc.end();
  });
}

export async function fileContainingSymbol(service_name: string, client: any) {
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
      file_containing_symbol: service_name,
    };
    const callGrpc = client['ServerReflectionInfo']({});
    callGrpc.on('data', dataCallback);
    callGrpc.write(input);
    callGrpc.end();
  });
}
