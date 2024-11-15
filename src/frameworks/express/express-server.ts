import express from 'express';
import * as http from 'node:http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import setupRoutes from './routes';
import { IServer } from '@application/interfaces/server';

export default class ExpressServer implements IServer {
  private static _serverInstance: ExpressServer;
  private _express: express.Express | undefined;
  private _server: http.Server | undefined;
  private _port: string = '3000';

  constructor() {}

  public static getInstance() {
    return this._serverInstance || (this._serverInstance = new this());
  }

  public getServer(): http.Server | null {
    return this._server || null;
  }

  public getPort(): string {
    return this._port;
  }

  public async initializeServer(
    ready?: (app: ExpressServer) => void,
  ): Promise<void> {
    if (this._express !== undefined) {
      throw new Error('App already initialized.');
    }

    // create express server application
    this._express = express();
    this._port = process.env.PORT || '3000';

    // init middlewares and express components
    this._express.use(helmet());
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: false }));

    // init routes
    setupRoutes(this._express);

    // Start server and listen requests 🔥
    this._server = this._express.listen(this._port, async () => {
      try {
        if (ready) ready(this);
        console.log(`Server is listening on port ${this._port}...`);
      } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
      }
    });

    process.on('SIGTERM', () => this.shutDown());
    process.on('SIGINT', () => this.shutDown());
  }

  public shutDown() {
    if (!this._server) return;

    this._server.close(() => {
      console.log('Closing out connections and stopping server...');
    });

    setTimeout(() => {
      console.error(
        'Could not close connections in time, forcefully shutting down...',
      );
      process.exit(1);
    }, 10000);
  }
}

export const Server = ExpressServer.getInstance();
