import { injectable } from 'smart-factory';
import { ConsumerModules } from './modules';
import { ConsumerTypes } from './types';
import { FcmSenderModules, FcmSenderTypes } from '../fcm-senders';
import { LoggerModules, LoggerTypes } from '../loggers';
import { ConfigModules, ConfigTypes } from '../configs';

type PushMessage = {
  title?: string;
  title_loc_key?: string;
  title_args?: any[];
  subtitle?: string;
  subtitle_loc_key?: string;
  subtitle_args?: any[];
  topic: string;
  body: {[key: string]: any};
};

type NativeNotification = {
  title?: string;
  title_loc_key?: string;
  title_loc_args?: string;
  body?: string;
  body_loc_key?: string;
  body_loc_args?: string;
};

const tag = '[fcm-consumer]';

injectable(ConsumerModules.Consumers.TopicFirebaseConsumer,
  [ LoggerModules.Logger,
    FcmSenderModules.SendToTopic,
    ConfigModules.TopicConfig ],
  async (log: LoggerTypes.Logger,
    sendToTopic: FcmSenderTypes.SendToTopic,
    cfg: ConfigTypes.TopicConfig): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.firebaseMessageQueue,
      consume: async (payload: PushMessage) => {
        log.debug(`${tag} message received from amqp queue:${cfg.firebaseMessageQueue}`);
        const notification: NativeNotification = {};
        const sendParam = {
          notification,
          data: payload.body,
          collapse_key: payload.topic
        };

        if (payload.title) notification.title = payload.title;
        if (payload.title_loc_key) notification.title_loc_key = payload.title_loc_key;
        if (payload.title_args) notification.title_loc_args = JSON.stringify(payload.title_args);
        if (payload.subtitle) notification.body = payload.subtitle;
        if (payload.subtitle_loc_key) notification.body_loc_key = payload.subtitle_loc_key;
        if (payload.subtitle_args) notification.body_loc_args = JSON.stringify(payload.subtitle_args);

        log.debug(`${tag} fcm-payload`);
        log.debug(sendParam);

        await sendToTopic(payload.topic, sendParam);
        log.debug(`${tag} message published to fcm, topic:${payload.topic}`);
      }
    }));


type PeerMessage = {
  member_nos: string[];
  device_tokens: string[];
  title: string;
  title_loc_key?: string;
  title_args?: string[];
  subtitle?: string;
  subtitle_loc_key?: string;
  subtitle_args?: any[];
  body: {[key: string]: any};
};

injectable(ConsumerModules.Consumers.PeerFirebaseConsumer,
  [ LoggerModules.Logger,
    ConfigModules.TopicConfig,
    FcmSenderModules.SendToDevice ],
  async (log: LoggerTypes.Logger,
    cfg: ConfigTypes.TopicConfig,
    sendToDevice: FcmSenderTypes.SendToDevice): Promise<ConsumerTypes.QueueConsumer> =>

    ({
      name: cfg.firebasePeerMessageQueue,
      consume: async (payload: PeerMessage) => {
        log.debug(`${tag} message received from amqp queue:${cfg.firebasePeerMessageQueue}`);
        console.log(payload);

        const notification: NativeNotification = {};
        const sendParam = {
          notification,
          data: payload.body
        };

        if (payload.title) notification.title = payload.title;
        if (payload.title_loc_key) notification.title_loc_key = payload.title_loc_key;
        if (payload.title_args) notification.title_loc_args = JSON.stringify(payload.title_args);

        if (payload.subtitle) notification.body = payload.subtitle;
        if (payload.subtitle_loc_key) notification.body_loc_key = payload.subtitle_loc_key;
        if (payload.subtitle_args) notification.body_loc_args = JSON.stringify(payload.subtitle_args);

        log.debug(`${tag} fcm-peer-payload`);
        log.debug(sendParam);

        sendToDevice(payload.device_tokens, sendParam);
      }
    }));