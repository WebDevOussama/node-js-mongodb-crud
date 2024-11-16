// eslint-disable-next-line simple-import-sort/imports
import 'reflect-metadata';
import type AppServer from 'server';
import './infrastructure/di';
import { container } from 'tsyringe';
import loadEnvironment from '@config/env';
import type { ILogger } from '@config/logger';

async function bootstrap() {
  loadEnvironment();

  const logger = container.resolve<ILogger>('Logger');
  const appServer = container.resolve<AppServer>('AppServer');

  try {
    await appServer.initialize();
    logger.info('Server successfully initialized');
  } catch (err) {
    logger.error('Failed to initialize the server:', err);
    // eslint-disable-next-line no-magic-numbers
    process.exit(1);
  }
}

bootstrap();
