import * as admin from 'firebase-admin';
import { ConfigTypes } from '../configs';
import { FcmSenderTypes } from './types';

type FcmSender = {
  sendToTopic: FcmSenderTypes.SendToTopic,
  sendToDevice: FcmSenderTypes.SendToDevice
};

class FcmInitError extends Error {}

let sender: FcmSender = null;
const initFcmSender =
  async (config: ConfigTypes.FcmConfig): Promise<FcmSender> => {
    if (sender != null) return sender;

    try {
      const privKeyContent = require(config.privKeyPath);
      admin.initializeApp({
        credential: admin.credential.cert(privKeyContent)
      });
    } catch (err) {
      throw new FcmInitError(`failed to initialize fcm: ${err.message}`);
    }
    sender = {
      async sendToTopic(topic, payload) {
        if (payload.data) {
          payload.data = {
            data: JSON.stringify(payload.data)
          };
        }
        await admin.messaging().sendToTopic(topic, payload);
      },

      async sendToDevice(deviceTokens, payload) {
        if (payload.data) {
          payload.data = {
            data: JSON.stringify(payload.data)
          };
        }
        await admin.messaging().sendToDevice(deviceTokens, payload);
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