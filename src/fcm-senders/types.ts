export namespace FcmSenderTypes {
  export type Payload = {
    collapse_key?: string;
    data?: {[key: string]: any};
    notification: {[key: string]: any};
  };

  export type SendToTopic = (topicName: string, payload: Payload) => Promise<void>;
  export type SendToDevice = (deviceTokens: string[], payload: Payload) => Promise<void>;
  export type Subscribe = (topicName: string, deviceTokens: string[]) => Promise<void>;
  export type Unsubscribe = (topicName: string, deviceTokens: string[]) => Promise<void>;
}