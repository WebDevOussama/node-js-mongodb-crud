import dotenv from 'dotenv';

interface IEnvConfig {
  PORT: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_INITDB_DATABASE: string;
  MONGO_REPLICA_HOST: string;
  MONGO_REPLICA_PORT: string;
  MONGO_URI: string;
}

const REQUIRED_ENV = [
  'PORT',
  'MONGO_INITDB_ROOT_USERNAME',
  'MONGO_INITDB_ROOT_PASSWORD',
  'MONGO_INITDB_DATABASE',
  'MONGO_REPLICA_HOST',
  'MONGO_REPLICA_PORT',
  'MONGO_URI',
  'SHUTDOWN_TIMEOUT_MS',
];

dotenv.config();

export default function loadEnv(): IEnvConfig {
  REQUIRED_ENV.forEach((variable) => {
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
