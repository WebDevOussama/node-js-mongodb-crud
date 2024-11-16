import type { ILogger } from '@config/logger';
import bodyParser from 'body-parser';
import type { RequestHandler } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { container } from 'tsyringe';

const logger = container.resolve<ILogger>('Logger');

const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

const morganMiddleware = morgan('combined', { stream: morganStream });

const middlewares: RequestHandler[] = [
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  morganMiddleware,
];

container.register<RequestHandler[]>('Middlewares', {
  useValue: middlewares,
});
