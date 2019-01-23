import { init, resolve } from 'smart-factory';
import { ConfigModules, ConfigTypes } from './configs';

(async () => {
  await init({
    includes: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.js`]
  });

  const cfg = <ConfigTypes.RootConfig>resolve(ConfigModules.RootConfig);
  console.log(cfg);
})();