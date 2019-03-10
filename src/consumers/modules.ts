export namespace ConsumerModules {
  export const AllConsumers = 'Consumer/AllConsumers';
  export const ConsumerRunner = 'Consumer/ConsumerRunner';

  export enum Consumers {
    FirebaseConsumer = 'Consumer/FirebaseConsumer',
    DeviceConsumer = 'Consumer/DeviceConsumer'
  }
}