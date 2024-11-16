import type { ILogger } from '@config/logger';
import { loggerAdapter } from '@config/logger';
import { container } from 'tsyringe';

container.registerInstance<ILogger>('Logger', loggerAdapter);
