import ExpressServer from '@frameworks/express/express-server';
import AppServer from 'server';
import { container } from 'tsyringe';

container.register('ExpressServer', {
  useClass: ExpressServer,
});

container.register('AppServer', {
  useClass: AppServer,
});
