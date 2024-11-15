import type { IServer } from '@application/interfaces/server';
import type { MongoDBConnection } from '@infrastructure/database/mongodb-connection';

export default class AppServer {
  private _server: IServer;
  private _mongodbConnection: MongoDBConnection;

  constructor(server: IServer, mongodbConnection: MongoDBConnection) {
    this._server = server;
    this._mongodbConnection = mongodbConnection;
  }

  public async initialize() {
    await this._server.initializeServer();
    // You can now inject MongoDB connection or others via services.
    await this._mongodbConnection.connect();
  }
}
