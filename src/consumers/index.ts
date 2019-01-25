import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';

injectable(ConsumerModules.AllConsumers,
  [ ConsumerModules.Consumers.FirebaseConsumer ],
  async (firebase: ConsumerTypes.QueueConsumer): Promise<ConsumerTypes.QueueConsumer[]> => [
    firebase
  ]);

export { ConsumerTypes } from './types';
export { ConsumerModules } from './modules';