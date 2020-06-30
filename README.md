# gRPC Reflection JS
![CI](https://github.com/redhoyasa/grpc-reflection-js/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/redhoyasa/grpc-reflection-js/branch/master/graph/badge.svg)](https://codecov.io/gh/redhoyasa/grpc-reflection-js)

A JS library for talking with any gRPC Server that implements [Reflection](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) protocol.

## Installation

```sh
npm install grpc-reflection-js
```

## Usage

```js
const grpc = require('grpc');
const grpcReflection = require('grpc-reflection-js');

const grpcReflectionServer = '<gRPC Reflection server host>'
const reflectionClient = new grpcReflection.Client(
  grpcReflectionServer,
  grpc.credentials.createInsecure()
);
const services = await reflectionClient.listServices()
```
