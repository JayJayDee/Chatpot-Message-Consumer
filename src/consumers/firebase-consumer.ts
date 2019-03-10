import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';
import { FcmSenderModules, FcmSenderTypes } from '../fcm-senders';
import { LoggerModules, LoggerTypes } from '../loggers';
import { ConfigModules, ConfigTypes } from '../configs';

type PushMessage = {
  title: string;
  subtitle: string;
  topic: string;
  body: {[key: string]: any};
};


injectable(ConsumerModules.Consumers.FirebaseConsumer,
  [ LoggerModules.Logger,
    FcmSenderModules.SendToTopic,
    ConfigModules.TopicConfig ],
  async (log: LoggerTypes.Logger,
    sendToTopic: FcmSenderTypes.SendToTopic,
    cfg: ConfigTypes.TopicConfig): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.firebaseMessageQueue,
      consume: async (payload: PushMessage) => {
        log.debug(`[fcm-consumer] message received from amqp queue:${cfg.firebaseMessageQueue}`);
        await sendToTopic(payload.topic, {
          notification: {
            title: payload.title,
            body: payload.subtitle
          },
          data: payload.body
        });
        log.debug(`[fcm-consumer] message published to fcm, topic:${payload.topic}`);
      }
    }));