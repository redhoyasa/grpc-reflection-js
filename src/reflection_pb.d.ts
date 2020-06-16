// package: grpc.reflection.v1alpha
// file: reflection.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ServerReflectionRequest extends jspb.Message { 
    getHost(): string;
    setHost(value: string): ServerReflectionRequest;


    hasFileByFilename(): boolean;
    clearFileByFilename(): void;
    getFileByFilename(): string;
    setFileByFilename(value: string): ServerReflectionRequest;


    hasFileContainingSymbol(): boolean;
    clearFileContainingSymbol(): void;
    getFileContainingSymbol(): string;
    setFileContainingSymbol(value: string): ServerReflectionRequest;


    hasFileContainingExtension(): boolean;
    clearFileContainingExtension(): void;
    getFileContainingExtension(): ExtensionRequest | undefined;
    setFileContainingExtension(value?: ExtensionRequest): ServerReflectionRequest;


    hasAllExtensionNumbersOfType(): boolean;
    clearAllExtensionNumbersOfType(): void;
    getAllExtensionNumbersOfType(): string;
    setAllExtensionNumbersOfType(value: string): ServerReflectionRequest;


    hasListServices(): boolean;
    clearListServices(): void;
    getListServices(): string;
    setListServices(value: string): ServerReflectionRequest;


    getMessageRequestCase(): ServerReflectionRequest.MessageRequestCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerReflectionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ServerReflectionRequest): ServerReflectionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerReflectionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerReflectionRequest;
    static deserializeBinaryFromReader(message: ServerReflectionRequest, reader: jspb.BinaryReader): ServerReflectionRequest;
}

export namespace ServerReflectionRequest {
    export type AsObject = {
        host: string,
        fileByFilename: string,
        fileContainingSymbol: string,
        fileContainingExtension?: ExtensionRequest.AsObject,
        allExtensionNumbersOfType: string,
        listServices: string,
    }

    export enum MessageRequestCase {
        MESSAGE_REQUEST_NOT_SET = 0,
    
    FILE_BY_FILENAME = 3,

    FILE_CONTAINING_SYMBOL = 4,

    FILE_CONTAINING_EXTENSION = 5,

    ALL_EXTENSION_NUMBERS_OF_TYPE = 6,

    LIST_SERVICES = 7,

    }

}

export class ExtensionRequest extends jspb.Message { 
    getContainingType(): string;
    setContainingType(value: string): ExtensionRequest;

    getExtensionNumber(): number;
    setExtensionNumber(value: number): ExtensionRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExtensionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExtensionRequest): ExtensionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExtensionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExtensionRequest;
    static deserializeBinaryFromReader(message: ExtensionRequest, reader: jspb.BinaryReader): ExtensionRequest;
}

export namespace ExtensionRequest {
    export type AsObject = {
        containingType: string,
        extensionNumber: number,
    }
}

export class ServerReflectionResponse extends jspb.Message { 
    getValidHost(): string;
    setValidHost(value: string): ServerReflectionResponse;


    hasOriginalRequest(): boolean;
    clearOriginalRequest(): void;
    getOriginalRequest(): ServerReflectionRequest | undefined;
    setOriginalRequest(value?: ServerReflectionRequest): ServerReflectionResponse;


    hasFileDescriptorResponse(): boolean;
    clearFileDescriptorResponse(): void;
    getFileDescriptorResponse(): FileDescriptorResponse | undefined;
    setFileDescriptorResponse(value?: FileDescriptorResponse): ServerReflectionResponse;


    hasAllExtensionNumbersResponse(): boolean;
    clearAllExtensionNumbersResponse(): void;
    getAllExtensionNumbersResponse(): ExtensionNumberResponse | undefined;
    setAllExtensionNumbersResponse(value?: ExtensionNumberResponse): ServerReflectionResponse;


    hasListServicesResponse(): boolean;
    clearListServicesResponse(): void;
    getListServicesResponse(): ListServiceResponse | undefined;
    setListServicesResponse(value?: ListServiceResponse): ServerReflectionResponse;


    hasErrorResponse(): boolean;
    clearErrorResponse(): void;
    getErrorResponse(): ErrorResponse | undefined;
    setErrorResponse(value?: ErrorResponse): ServerReflectionResponse;


    getMessageResponseCase(): ServerReflectionResponse.MessageResponseCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerReflectionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ServerReflectionResponse): ServerReflectionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerReflectionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerReflectionResponse;
    static deserializeBinaryFromReader(message: ServerReflectionResponse, reader: jspb.BinaryReader): ServerReflectionResponse;
}

export namespace ServerReflectionResponse {
    export type AsObject = {
        validHost: string,
        originalRequest?: ServerReflectionRequest.AsObject,
        fileDescriptorResponse?: FileDescriptorResponse.AsObject,
        allExtensionNumbersResponse?: ExtensionNumberResponse.AsObject,
        listServicesResponse?: ListServiceResponse.AsObject,
        errorResponse?: ErrorResponse.AsObject,
    }

    export enum MessageResponseCase {
        MESSAGE_RESPONSE_NOT_SET = 0,
    
    FILE_DESCRIPTOR_RESPONSE = 4,

    ALL_EXTENSION_NUMBERS_RESPONSE = 5,

    LIST_SERVICES_RESPONSE = 6,

    ERROR_RESPONSE = 7,

    }

}

export class FileDescriptorResponse extends jspb.Message { 
    clearFileDescriptorProtoList(): void;
    getFileDescriptorProtoList(): Array<Uint8Array | string>;
    getFileDescriptorProtoList_asU8(): Array<Uint8Array>;
    getFileDescriptorProtoList_asB64(): Array<string>;
    setFileDescriptorProtoList(value: Array<Uint8Array | string>): FileDescriptorResponse;
    addFileDescriptorProto(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileDescriptorResponse.AsObject;
    static toObject(includeInstance: boolean, msg: FileDescriptorResponse): FileDescriptorResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileDescriptorResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileDescriptorResponse;
    static deserializeBinaryFromReader(message: FileDescriptorResponse, reader: jspb.BinaryReader): FileDescriptorResponse;
}

export namespace FileDescriptorResponse {
    export type AsObject = {
        fileDescriptorProtoList: Array<Uint8Array | string>,
    }
}

export class ExtensionNumberResponse extends jspb.Message { 
    getBaseTypeName(): string;
    setBaseTypeName(value: string): ExtensionNumberResponse;

    clearExtensionNumberList(): void;
    getExtensionNumberList(): Array<number>;
    setExtensionNumberList(value: Array<number>): ExtensionNumberResponse;
    addExtensionNumber(value: number, index?: number): number;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExtensionNumberResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ExtensionNumberResponse): ExtensionNumberResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExtensionNumberResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExtensionNumberResponse;
    static deserializeBinaryFromReader(message: ExtensionNumberResponse, reader: jspb.BinaryReader): ExtensionNumberResponse;
}

export namespace ExtensionNumberResponse {
    export type AsObject = {
        baseTypeName: string,
        extensionNumberList: Array<number>,
    }
}

export class ListServiceResponse extends jspb.Message { 
    clearServiceList(): void;
    getServiceList(): Array<ServiceResponse>;
    setServiceList(value: Array<ServiceResponse>): ListServiceResponse;
    addService(value?: ServiceResponse, index?: number): ServiceResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListServiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListServiceResponse): ListServiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListServiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListServiceResponse;
    static deserializeBinaryFromReader(message: ListServiceResponse, reader: jspb.BinaryReader): ListServiceResponse;
}

export namespace ListServiceResponse {
    export type AsObject = {
        serviceList: Array<ServiceResponse.AsObject>,
    }
}

export class ServiceResponse extends jspb.Message { 
    getName(): string;
    setName(value: string): ServiceResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ServiceResponse): ServiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServiceResponse;
    static deserializeBinaryFromReader(message: ServiceResponse, reader: jspb.BinaryReader): ServiceResponse;
}

export namespace ServiceResponse {
    export type AsObject = {
        name: string,
    }
}

export class ErrorResponse extends jspb.Message { 
    getErrorCode(): number;
    setErrorCode(value: number): ErrorResponse;

    getErrorMessage(): string;
    setErrorMessage(value: string): ErrorResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ErrorResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ErrorResponse): ErrorResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ErrorResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ErrorResponse;
    static deserializeBinaryFromReader(message: ErrorResponse, reader: jspb.BinaryReader): ErrorResponse;
}

export namespace ErrorResponse {
    export type AsObject = {
        errorCode: number,
        errorMessage: string,
    }
}
