import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const {
  combine,
  printf,
  errors: errorFormat,
  timestamp: timestampFormat,
} = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestampFormat(), errorFormat({ stack: true }), logFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;
