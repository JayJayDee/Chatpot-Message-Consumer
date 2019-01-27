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
        await admin.messaging().sendToTopic(topic, payload);
      },

      async sendToDevice(deviceTokens, payload) {
        await admin.messaging().sendToDevice(deviceTokens, payload);
      }
    };
    return sender;
  };
export default initFcmSender;