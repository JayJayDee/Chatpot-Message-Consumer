import { injectable } from 'smart-factory';
import { FcmSenderModules } from './modules';
import { FcmSenderTypes } from './types';
import initFcm from './default-fcm-sender';
import { ConfigModules, ConfigTypes } from '../configs';

injectable(FcmSenderModules.SendToDevice,
  [ ConfigModules.FcmConfig ],
  async (cfg: ConfigTypes.FcmConfig): Promise<FcmSenderTypes.SendToDevice> => {
    const fcm = await initFcm(cfg);
    return fcm.sendToDevice;
  });

injectable(FcmSenderModules.SendToTopic,
  [ ConfigModules.FcmConfig ],
  async (cfg: ConfigTypes.FcmConfig): Promise<FcmSenderTypes.SendToDevice> => {
    const fcm = await initFcm(cfg);
    return fcm.sendToTopic;
  });

export { FcmSenderModules } from './modules';
export { FcmSenderTypes } from './types';