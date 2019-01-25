import { init, resolve } from 'smart-factory';
import { ConsumerModules, ConsumerTypes } from './consumers';

(async () => {
  await init({
    includes: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.js`]
  });

  const run =
    <ConsumerTypes.ConsumerRunner>resolve
      (ConsumerModules.ConsumerRunner);
  await run();
})();