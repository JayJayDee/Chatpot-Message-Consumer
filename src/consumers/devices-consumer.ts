import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { LoggerModules, LoggerTypes } from '../loggers';
import { ConfigModules, ConfigTypes } from '../configs';
import { ConsumerTypes } from './types';

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
    ConfigModules.TopicConfig ],
  async (log: LoggerTypes.Logger,
    cfg: ConfigTypes.TopicConfig): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.deviceQueue,
      consume: async (payload: DeviceSubscription) => {
        log.debug(`[device-consumer] message received from amqp queue:${cfg.deviceQueue}`);
        console.log(payload);
      }
    }));