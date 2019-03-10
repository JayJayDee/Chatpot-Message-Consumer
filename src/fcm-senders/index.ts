import { injectable } from 'smart-factory';
import { FcmSenderModules } from './modules';
import { FcmSenderTypes } from './types';
import initFcm from './default-fcm-sender';
import { ConfigModules, ConfigTypes } from '../configs';
import { LoggerModules, LoggerTypes } from '../loggers';

injectable(FcmSenderModules.SendToDevice,
  [ ConfigModules.FcmConfig,
    LoggerModules.Logger ],
  async (cfg: ConfigTypes.FcmConfig,
    log: LoggerTypes.Logger): Promise<FcmSenderTypes.SendToDevice> => {
    const fcm = await initFcm(cfg, log);
    return fcm.sendToDevice;
  });

injectable(FcmSenderModules.SendToTopic,
  [ ConfigModules.FcmConfig,
    LoggerModules.Logger ],
  async (cfg: ConfigTypes.FcmConfig,
    log: LoggerTypes.Logger): Promise<FcmSenderTypes.SendToTopic> => {
    const fcm = await initFcm(cfg, log);
    return fcm.sendToTopic;
  });

injectable(FcmSenderModules.Subscribe,
  [ ConfigModules.FcmConfig,
    LoggerModules.Logger ],
  async (cfg: ConfigTypes.FcmConfig,
    log: LoggerTypes.Logger): Promise<FcmSenderTypes.Subscribe> => {
    const fcm = await initFcm(cfg, log);
    return fcm.subscribe;
  });

injectable(FcmSenderModules.Unsubscribe,
  [ ConfigModules.FcmConfig,
    LoggerModules.Logger ],
  async (cfg: ConfigTypes.FcmConfig,
    log: LoggerTypes.Logger): Promise<FcmSenderTypes.Unsubscribe> => {
    const fcm = await initFcm(cfg, log);
    return fcm.unsubscribe;
  });

export { FcmSenderModules } from './modules';
export { FcmSenderTypes } from './types';