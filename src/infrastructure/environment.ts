import type IEnvConfig from '@application/interfaces/env-config';
import dotenv from 'dotenv';

dotenv.config();

export default function loadEnvironment(): IEnvConfig {
  const requiredVariables = [
    'PORT',
    'MONGO_INITDB_ROOT_USERNAME',
    'MONGO_INITDB_ROOT_PASSWORD',
    'MONGO_INITDB_DATABASE',
    'MONGO_REPLICA_HOST',
    'MONGO_REPLICA_PORT',
    'MONGO_URI',
    'SHUTDOWN_TIMEOUT_MS',
  ];

  requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(
        `Environment variable ${variable} is required but not set.`,
      );
    }
  });

  return {
    PORT: process.env.PORT as string,
    MONGO_INITDB_ROOT_USERNAME: process.env
      .MONGO_INITDB_ROOT_USERNAME as string,
    MONGO_INITDB_ROOT_PASSWORD: process.env
      .MONGO_INITDB_ROOT_PASSWORD as string,
    MONGO_INITDB_DATABASE: process.env.MONGO_INITDB_DATABASE as string,
    MONGO_REPLICA_HOST: process.env.MONGO_REPLICA_HOST as string,
    MONGO_REPLICA_PORT: process.env.MONGO_REPLICA_PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
  };
}
