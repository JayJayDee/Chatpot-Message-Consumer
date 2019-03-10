import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';

injectable(ConsumerModules.AllConsumers,
  [ ConsumerModules.Consumers.FirebaseConsumer,
    ConsumerModules.Consumers.DeviceConsumer ],
  async (firebase: ConsumerTypes.QueueConsumer,
    device: ConsumerTypes.QueueConsumer): Promise<ConsumerTypes.QueueConsumer[]> =>

    [
      firebase,
      device
    ]);

export { ConsumerTypes } from './types';
export { ConsumerModules } from './modules';