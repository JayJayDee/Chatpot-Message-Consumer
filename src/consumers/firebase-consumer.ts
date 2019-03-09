import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';
import { FcmSenderModules, FcmSenderTypes } from '../fcm-senders';
import { LoggerModules, LoggerTypes } from '../loggers';

type PushMessage = {
  title: string;
  subtitle: string;
  topic: string;
  body: {[key: string]: any};
};
const name = 'firebase-messages';

injectable(ConsumerModules.Consumers.FirebaseConsumer,
  [ LoggerModules.Logger,
    FcmSenderModules.SendToTopic ],
  async (log: LoggerTypes.Logger,
    sendToTopic: FcmSenderTypes.SendToTopic): Promise<ConsumerTypes.QueueConsumer> =>
    ({
      name,
      consume: async (payload: PushMessage) => {
        log.debug(`[fcm-consumer] message received from amqp queue:${name}`);
        await sendToTopic(`ROOM-${payload.topic}`, {
          notification: {
            title: payload.title,
            body: payload.subtitle
          },
          data: payload.body
        });
        log.debug(`[fcm-consumer] message published to fcm, topic:${payload.topic}`);
      }
    }));