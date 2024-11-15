import AppServer from 'server';
import ExpressServer from '@frameworks/express/express-server';
import { MongoDBConnection } from '@infrastructure/database/mongodb-connection';
import dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const expressServer = new ExpressServer();
  const appServer = new AppServer(
    expressServer,
    MongoDBConnection.getInstance(),
  );

  try {
    await appServer.initialize();
    console.log('Server successfully initialized');
  } catch (err) {
    console.error('Failed to initialize the server:', err);
    process.exit(1);
  }
}

bootstrap();
