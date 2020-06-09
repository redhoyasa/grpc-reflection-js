import {createReflectionClient, listServices} from '../src';
import * as grpc from 'grpc';
// eslint-disable-next-line node/no-unpublished-import
import {expect} from 'chai';

describe('listServices', () => {
  it('should return services', () => {
    const reflectionClient = createReflectionClient(
      '10.14.48.105:30506',
      grpc.credentials.createInsecure()
    );

    const expectedServices: string[] = [
      'grpc.reflection.v1alpha.ServerReflection',
      'phone.Messenger',
    ];
    expect(listServices(reflectionClient)).to.equal(expectedServices);
  });
});
