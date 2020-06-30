// package: grpc.reflection.v1alpha
// file: reflection.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as reflection_pb from "./reflection_pb";

interface IServerReflectionService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    serverReflectionInfo: IServerReflectionService_IServerReflectionInfo;
}

interface IServerReflectionService_IServerReflectionInfo extends grpc.MethodDefinition<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse> {
    path: string; // "/grpc.reflection.v1alpha.ServerReflection/ServerReflectionInfo"
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<reflection_pb.ServerReflectionRequest>;
    requestDeserialize: grpc.deserialize<reflection_pb.ServerReflectionRequest>;
    responseSerialize: grpc.serialize<reflection_pb.ServerReflectionResponse>;
    responseDeserialize: grpc.deserialize<reflection_pb.ServerReflectionResponse>;
}

export const ServerReflectionService: IServerReflectionService;

export interface IServerReflectionServer {
    serverReflectionInfo: grpc.handleBidiStreamingCall<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
}

export interface IServerReflectionClient {
    serverReflectionInfo(): grpc.ClientDuplexStream<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
    serverReflectionInfo(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
    serverReflectionInfo(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
}

export class ServerReflectionClient extends grpc.Client implements IServerReflectionClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public serverReflectionInfo(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
    public serverReflectionInfo(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<reflection_pb.ServerReflectionRequest, reflection_pb.ServerReflectionResponse>;
}
