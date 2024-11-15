import logger from '@infrastructure/logger';
import { container } from 'tsyringe';

container.register('Logger', { useValue: logger });
