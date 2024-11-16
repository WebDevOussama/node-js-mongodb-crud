import type IServer from '@core/interfaces/server';
import type { MongoDBConnection } from '@infrastructure/database/mongodb-connection';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AppServer {
  constructor(
    @inject('ExpressServer') private readonly _server: IServer,
    @inject('MongoDBConnection')
    private readonly _mongodbConnection: MongoDBConnection,
  ) {}

  public async initialize() {
    await this._server.initializeServer();
    await this._mongodbConnection.connect();
  }
}
