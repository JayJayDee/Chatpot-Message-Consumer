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
        const msg = admin.messaging as any;
        await msg.sendToTopic(topic, payload);
      },

      async sendToDevice(deviceTokens, payload) {
        const msg = admin.messaging as any;
        await msg.sendToDevice(deviceTokens, payload);
      }
    };
    return sender;
  };
export default initFcmSender;