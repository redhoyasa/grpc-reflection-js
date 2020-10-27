import {Client} from '../src/client';
import {credentials} from '@grpc/grpc-js';
// eslint-disable-next-line node/no-unpublished-import
import {assert} from 'chai';
import * as sinon from 'sinon';
import {
  ServerReflectionResponse,
  ListServiceResponse,
  ServiceResponse,
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
