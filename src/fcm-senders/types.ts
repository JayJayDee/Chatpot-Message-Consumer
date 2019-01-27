export namespace FcmSenderTypes {
  export type Payload = {
    data?: {[key: string]: any};
    notification: {[key: string]: any};
  };

  export type SendToTopic = (topicName: string, payload: Payload) => Promise<void>;
  export type SendToDevice = (deviceTokens: string[], payload: Payload) => Promise<void>;
}