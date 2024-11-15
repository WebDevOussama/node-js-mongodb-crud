import mongoose from 'mongoose';

export class MongoDBConnection {
  private static _instance: MongoDBConnection;

  private constructor() {}

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public async connect() {
    let retries = 5;
    while (retries) {
      try {
        const mongoURI = process.env.MONGO_URI as string;
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully.');
        break;
      } catch (err) {
        console.error('MongoDB connection failed', err);
        retries -= 1;
        if (!retries) throw err;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before retry
      }
    }
  }

  static async close() {
    await mongoose.disconnect();
    // Handle graceful shutdown of DB connections
    console.log('Disconnected from MongoDB');
  }
}
