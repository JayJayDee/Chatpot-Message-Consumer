import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';

injectable(ConsumerModules.Consumers.FirebaseConsumer,
  [],
  async (): Promise<ConsumerTypes.QueueConsumer> =>
    ({
      name: 'firebase-messages',
      async consume(payload) {
        console.log(payload);
      }
    }));