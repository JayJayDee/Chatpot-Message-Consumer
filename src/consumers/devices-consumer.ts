import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { LoggerModules, LoggerTypes } from '../loggers';
import { ConfigModules, ConfigTypes } from '../configs';
import { ConsumerTypes } from './types';

injectable(ConsumerModules.Consumers.DeviceConsumer,
  [ LoggerModules.Logger,
    ConfigModules.TopicConfig ],
  async (log: LoggerTypes.Logger,
    cfg: ConfigTypes.TopicConfig): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.deviceQueue,
      consume: async (payload: any) => {
        log.debug(`[device-consumer] message received from amqp queue:${cfg.deviceQueue}`);
        console.log(payload);
      }
    }));