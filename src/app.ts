import { init, resolve } from 'smart-factory';
import { ConfigModules } from './configs';

(async () => {
  await init({
    includes: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.js`]
  });

  const cfg = resolve(ConfigModules.RootConfig);
  console.log(cfg);
})();