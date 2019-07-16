import * as admin from 'firebase-admin';
import { ConfigTypes } from '../configs';
import { FcmSenderTypes } from './types';
import { LoggerTypes } from '../loggers';

type FcmSender = {
  sendToTopic: FcmSenderTypes.SendToTopic,
  sendToDevice: FcmSenderTypes.SendToDevice,
  subscribe: FcmSenderTypes.Subscribe,
  unsubscribe: FcmSenderTypes.Unsubscribe
};

class FcmInitError extends Error {}

let sender: FcmSender = null;
const initFcmSender =
  async (config: ConfigTypes.FcmConfig, log: LoggerTypes.Logger): Promise<FcmSender> => {
    if (sender != null) return sender;

    try {
      const privKeyContent = require(config.privKeyPath);
      admin.initializeApp({
        credential: admin.credential.cert(privKeyContent)
      });
      log.debug(`[fcm-sender] fcm initialized`);
    } catch (err) {
      throw new FcmInitError(`failed to initialize fcm: ${err.message}`);
    }
    sender = {
      async sendToTopic(topic, payload) {
        if (payload.data) {
          payload.data = {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            payload: JSON.stringify(payload.data)
          };
        }
        console.log(payload);
        await admin.messaging().sendToTopic(topic, payload);
      },

      async sendToDevice(deviceTokens, payload) {
        if (payload.data) {
          payload.data = {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            payload: JSON.stringify(payload.data)
          };
        }
        await admin.messaging().sendToDevice(deviceTokens, payload);
      },

      async subscribe(topic, deviceTokens) {
        await admin.messaging().subscribeToTopic(deviceTokens, topic);
      },

      async unsubscribe(topic, deviceTokens) {
        await admin.messaging().unsubscribeFromTopic(deviceTokens, topic);
      }
    };
    return sender;
  };
export default initFcmSender;


// const stringifyOnedepth = (src: {[key: string]: any}): {[key: string]: string} => {
//   const resp: {[key: string]: string} = {};
//   Object.keys(src).map((k) =>
//     resp[k] = isObject(src[k]) ? JSON.stringify(src[k]) : src[k]);
//   return resp;
// };