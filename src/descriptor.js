const protobuf = require('protobufjs');
const Descriptor = require('protobufjs/ext/descriptor');
const set = require('lodash.set');

/**
 * @typedef {import('protobufjs').Root} Root
 * @typedef {import('protobufjs').Message} Message
 */

/**
 * Get Protobuf.js Root object from the serialized FileDescriptorProto messages
 * that gotten from reflection service.
 * @param {Array<Uint8Array|string>|undefined} file_descriptor_protos - Reflection descriptor protos
 * @return {Root} Protobuf.js Root object
 */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
export function getDescriptorRoot(file_descriptor_protos) {
  const descriptorSet = Descriptor.FileDescriptorSet.create();

  file_descriptor_protos.forEach((descriptorByte, i) => {
    const descriptor = Descriptor.FileDescriptorProto.decode(descriptorByte);
    set(descriptorSet, 'file[' + i + ']', descriptor);
  });
  return protobuf.Root.fromDescriptor(descriptorSet);
}

/**
 * Get Protobuf.js Root object from FileDescriptorSet
 * @param {Message file_descriptor_set - File descriptor set
 * @return {Root} Protobuf.js Root object
 */
// eslint-disable-next-line node/no-unsupported-features/es-syntax
export function getDescriptorRootFromDescriptorSet(file_descriptor_set) {
  return protobuf.Root.fromDescriptor(file_descriptor_set);
}
