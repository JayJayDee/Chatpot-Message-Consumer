import { connect, Connection } from 'amqplib';
import { ConfigTypes } from '../configs';
import { QueueTypes } from './types';
import { LoggerTypes } from '../loggers';

const initRabbitMqClient =
  async (cfg: ConfigTypes.AmqpConfig,
    log: LoggerTypes.Logger): Promise<QueueTypes.AmqpClient> => {
      log.info(`[amqp] establishing amqp-client connection:${cfg.host}...`);
      const client = await createRabbitMqConnection(cfg, log);
      log.info(`[amqp] amqp-client connection established`);
      return buildAmqpClient(client);
    };
export default initRabbitMqClient;

const buildAmqpClient =
  (client: Connection): QueueTypes.AmqpClient => ({
    async subscribe(topic, callback) {
      await client.createChannel();
      // TODO: to be replaced.
    }
  });

const createRabbitMqConnection =
  (cfg: ConfigTypes.AmqpConfig, log: LoggerTypes.Logger): Promise<Connection> =>
    new Promise((resolve, reject) => {
      connect({
        hostname: cfg.host,
        port: cfg.port,
        username: cfg.login,
        password: cfg.password
      }).then(resolve).catch(reject);
    });