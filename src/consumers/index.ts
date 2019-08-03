import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';

injectable(ConsumerModules.AllConsumers,
  [ ConsumerModules.Consumers.TopicFirebaseConsumer,
    ConsumerModules.Consumers.PeerFirebaseConsumer,
    ConsumerModules.Consumers.DeviceConsumer ],
  async (firebase: ConsumerTypes.QueueConsumer,
    firebasePeer: ConsumerTypes.QueueConsumer,
    device: ConsumerTypes.QueueConsumer): Promise<ConsumerTypes.QueueConsumer[]> =>

    [
      firebase,
      firebasePeer,
      device
    ]);

export { ConsumerTypes } from './types';
export { ConsumerModules } from './modules';