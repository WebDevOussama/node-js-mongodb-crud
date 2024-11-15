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
        console.log('MongoDB connected successfully.');
        return; // Exit on success
      } catch (err) {
        this.logConnectionError(err, attempt, retries);

        if (attempt < retries) {
          await this.delay(RETRY_TIMEOUT);
        } else {
          throw err; // Rethrow the error after the last attempt
        }
      }
    }
  }

  private logConnectionError(
    err: unknown,
    attempt: number,
    retries: number,
  ): void {
    const isLastAttempt = attempt === retries;
    const message = isLastAttempt
      ? `MongoDB connection failed after ${retries} attempts.`
      : `MongoDB connection attempt ${attempt} failed. Retrying...`;

    console.error(message, err);
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
