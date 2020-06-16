import {getDescriptorRoot} from '../src/descriptor';
// eslint-disable-next-line node/no-unpublished-import
import {assert} from 'chai';

// eslint-disable-next-line no-undef
describe('getDescriptorRoot', () => {
  // eslint-disable-next-line no-undef
  it('should return Root', () => {
    // eslint-disable-next-line prettier/prettier
    const protoBytes = Buffer.from([10,11,112,104,111,110,101,46,112,114,111,116,111,18,5,112,104,111,110,101,34,55,10,11,84,101,120,116,82,101,113,117,101,115,116,18,14,10,2,105,100,24,1,32,1,40,9,82,2,105,100,18,24,10,7,109,101,115,115,97,103,101,24,2,32,1,40,9,82,7,109,101,115,115,97,103,101,34,40,10,12,84,101,120,116,82,101,115,112,111,110,115,101,18,24,10,7,115,117,99,99,101,115,115,24,1,32,1,40,8,82,7,115,117,99,99,101,115,115,50,63,10,9,77,101,115,115,101,110,103,101,114,18,50,10,7,77,101,115,115,97,103,101,18,18,46,112,104,111,110,101,46,84,101,120,116,82,101,113,117,101,115,116,26,19,46,112,104,111,110,101,46,84,101,120,116,82,101,115,112,111,110,115,101,98,6,112,114,111,116,111,51]);
    const root = getDescriptorRoot([protoBytes]);
    assert.deepEqual(root.files, ['phone.proto']);
  });
});
