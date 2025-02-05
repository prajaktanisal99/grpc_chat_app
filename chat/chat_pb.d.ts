import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class User extends jspb.Message {
  getId(): string;
  setId(value: string): User;

  getName(): string;
  setName(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class Message extends jspb.Message {
  getSenderid(): string;
  setSenderid(value: string): Message;

  getReceiverid(): string;
  setReceiverid(value: string): Message;

  getContent(): string;
  setContent(value: string): Message;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): Message;
  hasTimestamp(): boolean;
  clearTimestamp(): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    senderid: string,
    receiverid: string,
    content: string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class Connect extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): Connect;
  hasUser(): boolean;
  clearUser(): Connect;

  getActive(): boolean;
  setActive(value: boolean): Connect;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Connect.AsObject;
  static toObject(includeInstance: boolean, msg: Connect): Connect.AsObject;
  static serializeBinaryToWriter(message: Connect, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Connect;
  static deserializeBinaryFromReader(message: Connect, reader: jspb.BinaryReader): Connect;
}

export namespace Connect {
  export type AsObject = {
    user?: User.AsObject,
    active: boolean,
  }
}

export class Close extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Close.AsObject;
  static toObject(includeInstance: boolean, msg: Close): Close.AsObject;
  static serializeBinaryToWriter(message: Close, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Close;
  static deserializeBinaryFromReader(message: Close, reader: jspb.BinaryReader): Close;
}

export namespace Close {
  export type AsObject = {
  }
}

