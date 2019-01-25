import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { QueueModules, QueueTypes } from '../queues';

injectable(ConsumerModules.FirebaseConsumer,
  [ QueueModules.AmqpClient ],
  async (client: QueueTypes.AmqpClient) =>
    () => {
      client.subscribe('test-topic', async (msg) => {
        console.log('message arrived!');
        console.log(msg);
      });
    });