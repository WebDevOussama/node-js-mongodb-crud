import type { ILogger } from '@config/logger';
import mongoose from 'mongoose';
import { inject, singleton } from 'tsyringe';

@singleton()
export class MongoDBConnection {
  constructor(@inject('Logger') private readonly logger: ILogger) {}

  public async connect() {
    try {
      const mongoURI = process.env.MONGO_URI as string;
      await mongoose.connect(mongoURI);
      this.logger.info('MongoDB connected successfully.');
    } catch (err) {
      this.logger.error('MongoDB connection failed', err);
    }
  }

  // handle gracefull shutdown ?
}
