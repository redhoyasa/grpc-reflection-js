# gRPC Reflection JS
[![npm version](https://badge.fury.io/js/grpc-reflection-js.svg)](https://badge.fury.io/js/grpc-reflection-js)
![CI](https://github.com/redhoyasa/grpc-reflection-js/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/redhoyasa/grpc-reflection-js/branch/master/graph/badge.svg)](https://codecov.io/gh/redhoyasa/grpc-reflection-js)

A JS library for talking with any gRPC Server that implements [Reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) protocol.

## Installation

```sh
npm install grpc-reflection-js
```

## Usage
- [Initialize client](#Initialize client)
- [listServices](#listServices): List gRPC services
- [fileContainingSymbol](#fileContainingSymbol): Get protobuf Root using fully-qualified symbol name


### Initialize client
```js
const grpc = require('grpc');
const grpcReflection = require('grpc-reflection-js');

const grpcReflectionServer = '<gRPC Reflection server host>'
const reflectionClient = new grpcReflection.Client(
  grpcReflectionServer,
  grpc.credentials.createInsecure()
);
```

### listServices
```js
const services = await reflectionClient.listServices()
```
Output
```text
['grpc.reflection.v1alpha.ServerReflection', 'phone.Messenger']
```

### fileContainingSymbol
```js
const root = await reflectionClient.fileContainingSymbol('phone.Messenger')
```
