import { ConfigTypes } from '../configs';
import { QueueTypes } from './types';
import { LoggerTypes } from '../loggers';
import { AMQPClient, createConnection } from 'amqp';

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
  (client: AMQPClient): QueueTypes.AmqpClient => ({
    subscribe(callback) {
      // TODO: to be implemented.
    }
  });

const createRabbitMqConnection =
  (cfg: ConfigTypes.AmqpConfig, log: LoggerTypes.Logger): Promise<AMQPClient> =>
    new Promise((resolve, reject) => {
      const con = createConnection(cfg);
      con.on('ready', (con) => {
        resolve(con);
      });
      con.on('error', (err) => {
        reject(err);
        con.off('err', this);
      });
    });