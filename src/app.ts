import { init, resolve } from 'smart-factory';
import { ConsumerModules } from './consumers';

(async () => {
  await init({
    includes: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.js`]
  });

  const consume: Function = resolve(ConsumerModules.FirebaseConsumer);
  consume();
})();