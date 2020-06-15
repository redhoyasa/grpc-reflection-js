import {Client} from '../src/client';
import * as grpc from 'grpc';
// eslint-disable-next-line node/no-unpublished-import
import {expect} from 'chai';

describe('listServices', () => {
  it('should return services', async () => {
    const reflectionClient = new Client(
      'localhost:4770',
      grpc.credentials.createInsecure()
    );

    const expectedServices: string[] = [
      'grpc.reflection.v1alpha.ServerReflection',
      'phone.Messenger',
    ];
    expect(await reflectionClient.listServices()).to.equal(expectedServices);
  });
});
