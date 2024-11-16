/* eslint-disable no-magic-numbers */
import type { ILogger } from '@config/logger';
import type IServer from '@core/interfaces/server';
import express from 'express';
import type * as http from 'node:http';
import { inject, injectable } from 'tsyringe';
import setupRoutes from './routes';

const DEFAULT_PORT = '3000';
const SHUTDOWN_TIMEOUT_MS = parseInt(
  process.env.SHUTDOWN_TIMEOUT_MS || '10000',
  10,
);
const ENABLE_MIDDLEWARE_LOGGING =
  process.env.ENABLE_MIDDLEWARE_LOGGING === 'true';

@injectable()
export default class ExpressServer implements IServer {
  private _express: express.Express | undefined;
  private _server: http.Server | undefined;
  private readonly _port: string;

  constructor(
    @inject('Logger')
    private readonly logger: ILogger,
    @inject('Middlewares')
    private readonly middlewares: express.RequestHandler[],
  ) {
    this._port = process.env.PORT ?? DEFAULT_PORT;
  }

  public async initializeServer(): Promise<void> {
    if (this._express !== undefined) {
      const errorMessage = 'App already initialized.';
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      // create express server application
      this._express = express();

      // Apply injected middlewaresclear
      this.applyMiddlewares();

      // init routes
      setupRoutes(this._express);

      // Start server and listen requests 🔥
      this._server = this._express.listen(this._port, () => {
        this.logger.info(`Server is listening on port ${this._port} 🚀✨`);
      });
    } catch (error) {
      this.logger.error('Failed to initialize server:', error);
      process.exit(1);
    }

    this.setupSignalHandlers();
  }

  private logMiddleware(middleware: express.RequestHandler): void {
    if (ENABLE_MIDDLEWARE_LOGGING) {
      this.logger.info(`Applied middleware: ${middleware.name || 'unknown'}`);
    }
  }

  private applyMiddlewares(): void {
    try {
      if (!this._express) return;

      this.middlewares.forEach((middleware) => {
        this._express?.use(middleware);

        this.logMiddleware(middleware);
      });
    } catch (error) {
      this.logger.error('Error while applying middlewares:', error);
      throw error;
    }
  }

  private async shutDown() {
    if (!this._server) return;

    this.logger.info('Received shutdown signal, gracefully shutting down...');

    try {
      // Close the server and handle requests gracefully
      await new Promise<void>((resolve, reject) => {
        this._server?.close((err) => {
          if (err) {
            this.logger.error('Error while shutting down the server:', err);
            reject(err);
          } else {
            this.logger.info('Closed out remaining connections.');
            resolve();
          }
        });
      });
    } catch (error) {
      this.logger.error('Error during shutdown:', error);
      process.exit(1);
    }

    // Forcefully shut down if not graceful within SHUTDOWN_TIMEOUT_MS
    setTimeout(() => {
      this.logger.error(
        'Could not close connections in time, forcefully shutting down...',
      );
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
  }

  private setupSignalHandlers(): void {
    process.on('SIGTERM', async () => await this.shutDown());
    process.on('SIGINT', async () => await this.shutDown());
  }
}
