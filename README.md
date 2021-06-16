# gRPC Reflection JS
[![npm version](https://badge.fury.io/js/grpc-reflection-js.svg)](https://badge.fury.io/js/grpc-reflection-js)
![CI](https://github.com/redhoyasa/grpc-reflection-js/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/redhoyasa/grpc-reflection-js/branch/master/graph/badge.svg)](https://codecov.io/gh/redhoyasa/grpc-reflection-js)

A JS library for talking with any gRPC Server that implements [Reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) protocol.

## Installation

Install with npm:
```sh
npm install grpc-reflection-js @grpc/grpc-js
```

Install with yarn:
```sh
yarn add grpc-reflection-js @grpc/grpc-js
```

## Usage
- [Initialize client](#Initialize)
- [listServices](#listServices): List gRPC services
- [fileContainingSymbol](#fileContainingSymbol): Get protobuf Root using fully-qualified symbol name
- [fileByFilename](#fileByFilename): Get protobuf Root using proto file name


### Initialize
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

### fileByFilename
```js
const root = await reflectionClient.fileContainingSymbol('contact.proto')
```

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-lightgrey.svg?maxAge=2592000)](https://raw.githubusercontent.com/apollostack/apollo-ios/master/LICENSE)

MIT
