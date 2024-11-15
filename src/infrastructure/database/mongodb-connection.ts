import mongoose from 'mongoose';

export class MongoDBConnection {
  private static _instance: MongoDBConnection;

  private constructor() {}

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public async connect() {
    try {
      const mongoURI = process.env.MONGO_URI as string;
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully.');
    } catch (err) {
      console.error('MongoDB connection failed', err);
    }
  }

  static async close() {
    await mongoose.disconnect();
    // Handle graceful shutdown of DB connections
    console.log('Disconnected from MongoDB');
  }
}
