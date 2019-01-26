export namespace FcmSenderTypes {
  export type SendToTopic = (topicName: string, payload: any) => Promise<void>;
  export type SendToDevice = (deviceToken: string, payload: any) => Promise<void>;
}