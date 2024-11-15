import { MongoDBConnection } from '@infrastructure/database/mongodb-connection';
import { container } from 'tsyringe';

container.registerSingleton('MongoDBConnection', MongoDBConnection);
