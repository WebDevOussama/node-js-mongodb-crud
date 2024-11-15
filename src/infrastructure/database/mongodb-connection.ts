import mongoose from 'mongoose';

const RETRY_TIMEOUT = 5000;

export class MongoDBConnection {
  private static _instance: MongoDBConnection;

  private constructor() {}

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public async connect() {
    const mongoURI = process.env.MONGO_URI as string;

    try {
      await this.retryConnection(mongoURI);
      console.log('MongoDB connected successfully.');
    } catch (err) {
      console.error(
        'Failed to connect to MongoDB after multiple attempts.',
        err,
      );
      throw err;
    }
  }

  private async retryConnection(mongoURI: string, retries = 5): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await mongoose.connect(mongoURI);
        return; // Break loop if connected successfully
      } catch (err) {
        console.error(
          `MongoDB connection attempt ${attempt} failed. Retries left: ${retries - attempt}`,
        );

        if (attempt === retries) throw err; // Rethrow after all retries
        await this.delay(RETRY_TIMEOUT);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
