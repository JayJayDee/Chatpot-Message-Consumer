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
        // TODO: to be implemented
      },

      async sendToDevice(deviceToken, payload) {
        // TODO: to be implemented
      }
    };
    return sender;
  };
export default initFcmSender;