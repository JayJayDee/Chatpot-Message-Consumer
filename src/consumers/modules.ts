export namespace ConsumerModules {
  export const AllConsumers = 'Consumer/AllConsumers';
  export const ConsumerRunner = 'Consumer/ConsumerRunner';

  export enum Consumers {
    TopicFirebaseConsumer = 'Consumer/TopicFirebaseConsumer',
    PeerFirebaseConsumer = 'Consumer/PeerFirebaseConsumer',
    DeviceConsumer = 'Consumer/DeviceConsumer'
  }
}