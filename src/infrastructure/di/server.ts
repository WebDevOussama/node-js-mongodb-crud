import ExpressServer from '@core/express/express-server';
import AppServer from 'server';
import { container } from 'tsyringe';

container.registerSingleton('ExpressServer', ExpressServer);

container.register('AppServer', {
  useClass: AppServer,
});
