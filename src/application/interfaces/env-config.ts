export default interface IEnvConfig {
  PORT: string;
  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_INITDB_DATABASE: string;
  MONGO_REPLICA_HOST: string;
  MONGO_REPLICA_PORT: string;
  MONGO_URI: string;
}
