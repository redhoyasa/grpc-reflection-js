import {Client} from '../src/client';
import {credentials} from '@grpc/grpc-js';
// eslint-disable-next-line node/no-unpublished-import
import {assert} from 'chai';
import * as sinon from 'sinon';
import {
  ServerReflectionResponse,
  ListServiceResponse,
  ServiceResponse,
  FileDescriptorResponse,
} from '../src/reflection_pb';

// eslint-disable-next-line no-undef
describe('listServices', () => {
  // eslint-disable-next-line no-undef
  it('should return services', async () => {
    const reflectionClient = new Client(
      'localhost:4770',
      credentials.createInsecure()
    );

    const grpcCall = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: function (_event: string, listener: (...args: any[]) => void) {
        const res = new ServerReflectionResponse();

        const service1 = new ServiceResponse();
        service1.setName('grpc.reflection.v1alpha.ServerReflection');
        const service2 = new ServiceResponse();
        service2.setName('phone.Messenger');
        const serviceList = [service1, service2];

        const listService = new ListServiceResponse();
        listService.setServiceList(serviceList);
        res.setListServicesResponse(listService);

        listener(res);
      },
      write: function () {},
      end: function () {},
    };

    const mock = sinon.mock(reflectionClient.grpcClient);
    mock.expects('serverReflectionInfo').once().returns(grpcCall);

    const expectedServices: string[] | void[] = [
      'grpc.reflection.v1alpha.ServerReflection',
      'phone.Messenger',
    ];
    assert.deepEqual(await reflectionClient.listServices(), expectedServices);
  });
});

// eslint-disable-next-line no-undef
describe('fileContainingSymbol', () => {
  // eslint-disable-next-line no-undef
  it('should return Root', async () => {
    const reflectionClient = new Client(
      'localhost:4770',
      credentials.createInsecure()
    );

    const grpcCall = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: function (_event: string, listener: (...args: any[]) => void) {
        const res = new ServerReflectionResponse();
        const fileDescriptorResponse = new FileDescriptorResponse();
        // eslint-disable-next-line prettier/prettier
        const protoBytes = Buffer.from([10,11,112,104,111,110,101,46,112,114,111,116,111,18,5,112,104,111,110,101,26,13,99,111,110,116,97,99,116,46,112,114,111,116,111,34,97,10,11,84,101,120,116,82,101,113,117,101,115,116,18,14,10,2,105,100,24,1,32,1,40,9,82,2,105,100,18,24,10,7,109,101,115,115,97,103,101,24,2,32,1,40,9,82,7,109,101,115,115,97,103,101,18,40,10,7,99,111,110,116,97,99,116,24,3,32,1,40,11,50,14,46,112,104,111,110,101,46,67,111,110,116,97,99,116,82,7,99,111,110,116,97,99,116,34,40,10,12,84,101,120,116,82,101,115,112,111,110,115,101,18,24,10,7,115,117,99,99,101,115,115,24,1,32,1,40,8,82,7,115,117,99,99,101,115,115,50,63,10,9,77,101,115,115,101,110,103,101,114,18,50,10,7,77,101,115,115,97,103,101,18,18,46,112,104,111,110,101,46,84,101,120,116,82,101,113,117,101,115,116,26,19,46,112,104,111,110,101,46,84,101,120,116,82,101,115,112,111,110,115,101,98,6,112,114,111,116,111,51]);
        fileDescriptorResponse.addFileDescriptorProto(protoBytes);
        res.setFileDescriptorResponse(fileDescriptorResponse);

        listener(res);
      },
      write: function () {},
      end: function () {},
    };

    const mock = sinon.mock(reflectionClient.grpcClient);
    mock.expects('serverReflectionInfo').once().returns(grpcCall);
    const root = await reflectionClient.fileContainingSymbol('phone.Messenger');
    assert.deepEqual(root.files, ['phone.proto']);
  });
});
