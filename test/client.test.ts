import {Client} from '../src/client';
import * as grpc from 'grpc';
// eslint-disable-next-line node/no-unpublished-import
import {assert} from 'chai';

// eslint-disable-next-line no-undef
describe('listServices', () => {
  // eslint-disable-next-line no-undef
  it('should return services', async () => {
    const reflectionClient = new Client(
      'localhost:4770',
      grpc.credentials.createInsecure()
    );

    const expectedServices: string[] = [
      'grpc.reflection.v1alpha.ServerReflection',
      'phone.Messenger',
    ];
    assert.deepEqual(await reflectionClient.listServices(), expectedServices);
  });
});
