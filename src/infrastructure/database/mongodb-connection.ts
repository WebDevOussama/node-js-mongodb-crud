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
    let attempt = 0;

    while (attempt < retries) {
      attempt++;
      const isLastAttempt = attempt === retries;

      try {
        await mongoose.connect(mongoURI);
        return; // Exit on successful connection
      } catch (err) {
        this.handleConnectionError(err, attempt, isLastAttempt);

        if (isLastAttempt) throw err;
        await this.delay(RETRY_TIMEOUT);
      }
    }
  }

  private handleConnectionError(
    err: unknown,
    attempt: number,
    isLastAttempt: boolean,
  ): void {
    if (isLastAttempt) {
      console.error(`MongoDB connection failed after ${attempt} attempts.`);
    } else {
      console.error(
        `MongoDB connection attempt ${attempt} failed. Retrying...`,
      );
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
