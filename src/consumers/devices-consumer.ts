import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { LoggerModules, LoggerTypes } from '../loggers';
import { ConfigModules, ConfigTypes } from '../configs';
import { ConsumerTypes } from './types';
import { FcmSenderModules, FcmSenderTypes } from '../fcm-senders';

enum SubscriptionType {
  SUBSCRIBE = 'SUBSCRIBE',
  UNSUBSCRIBE = 'UNSUBSCRIBE'
}

type DeviceSubscription = {
  type: SubscriptionType;
  device_tokens: string[];
  topic: string;
};

injectable(ConsumerModules.Consumers.DeviceConsumer,
  [ LoggerModules.Logger,
    ConfigModules.TopicConfig,
    FcmSenderModules.Subscribe,
    FcmSenderModules.Unsubscribe ],
  async (log: LoggerTypes.Logger,
    cfg: ConfigTypes.TopicConfig,
    subscribe: FcmSenderTypes.Subscribe,
    unsubscribe: FcmSenderTypes.Unsubscribe): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.deviceQueue,
      consume: async (payload: DeviceSubscription) => {
        if (payload.type === SubscriptionType.SUBSCRIBE) {
          await subscribe(payload.topic, payload.device_tokens);
          log.debug(`[device-consumer] subscription completed, topic:${payload.topic}`);

        } else if (payload.type === SubscriptionType.UNSUBSCRIBE) {
          await unsubscribe(payload.topic, payload.device_tokens);
          log.debug(`[device-consumer] unsubscription completed, topic:${payload.topic}`);
        }
      }
    }));