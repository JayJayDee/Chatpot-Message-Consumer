import { connect, Connection, Channel } from 'amqplib';
import { ConfigTypes } from '../configs';
import { QueueTypes } from './types';
import { LoggerTypes } from '../loggers';

const initRabbitMqClient =
  async (cfg: ConfigTypes.AmqpConfig,
    log: LoggerTypes.Logger): Promise<QueueTypes.AmqpClient> => {
      log.info(`[amqp] establishing amqp-client connection:${cfg.host}...`);
      const client = await createRabbitMqConnection(cfg, log);
      log.info(`[amqp] amqp-client connection established`);

      const channel = await client.createChannel();
      await channel.assertQueue('test-queue', {durable: true});
      log.info(`[amqp] amqp-channel created`);
      return buildAmqpClient(channel);
    };
export default initRabbitMqClient;

const buildAmqpClient =
  (client: Channel): QueueTypes.AmqpClient => ({
    async subscribe(topic, subscriber) {
      await client.assertQueue(topic, { durable: true });
      client.consume(topic, (msg) => {
        console.log(msg);
        // TODO: calls back to subscriber
      }, { noAck: true });
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