export interface IServer {
  initializeServer(): Promise<void>;
  shutDown(): void;
  getServer(): any;
  getPort(): string;
}
