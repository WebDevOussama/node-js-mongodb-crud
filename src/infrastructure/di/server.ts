import ExpressServer from '@core/express/express-server';
import { container } from 'tsyringe';
import AppServer from '../../server';

container.registerSingleton('ExpressServer', ExpressServer);

container.register('AppServer', {
  useClass: AppServer,
});
