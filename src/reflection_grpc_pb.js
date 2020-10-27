// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2016 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Service exported by server reflection
//
'use strict';
var grpc = require('@grpc/grpc-js');
var reflection_pb = require('./reflection_pb.js');

function serialize_grpc_reflection_v1alpha_ServerReflectionRequest(arg) {
  if (!(arg instanceof reflection_pb.ServerReflectionRequest)) {
    throw new Error('Expected argument of type grpc.reflection.v1alpha.ServerReflectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_reflection_v1alpha_ServerReflectionRequest(buffer_arg) {
  return reflection_pb.ServerReflectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_reflection_v1alpha_ServerReflectionResponse(arg) {
  if (!(arg instanceof reflection_pb.ServerReflectionResponse)) {
    throw new Error('Expected argument of type grpc.reflection.v1alpha.ServerReflectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_grpc_reflection_v1alpha_ServerReflectionResponse(buffer_arg) {
  return reflection_pb.ServerReflectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServerReflectionService = exports.ServerReflectionService = {
  // The reflection service is structured as a bidirectional stream, ensuring
// all related requests go to a single server.
serverReflectionInfo: {
    path: '/grpc.reflection.v1alpha.ServerReflection/ServerReflectionInfo',
    requestStream: true,
    responseStream: true,
    requestType: reflection_pb.ServerReflectionRequest,
    responseType: reflection_pb.ServerReflectionResponse,
    requestSerialize: serialize_grpc_reflection_v1alpha_ServerReflectionRequest,
    requestDeserialize: deserialize_grpc_reflection_v1alpha_ServerReflectionRequest,
    responseSerialize: serialize_grpc_reflection_v1alpha_ServerReflectionResponse,
    responseDeserialize: deserialize_grpc_reflection_v1alpha_ServerReflectionResponse,
  },
};

exports.ServerReflectionClient = grpc.makeGenericClientConstructor(ServerReflectionService);
