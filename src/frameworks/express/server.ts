import express from "express";
import * as http from "node:http";
import bodyParser from "body-parser";
import helmet from "helmet";
import setupRoutes from "./routes";

class AppServer {
  private static _serverInstance: AppServer;
  private _express: express.Express | undefined;
  private _server: http.Server | undefined;
  private _port: string = "3000";

  constructor() {}

  public static getInstance() {
    return this._serverInstance || (this._serverInstance = new this());
  }

  public get server(): http.Server | null {
    return this._server || null;
  }

  public get port(): string {
    return this._port;
  }

  public initializeServer(ready?: (app: AppServer) => void): AppServer {
    if (this._express !== undefined) {
      throw new Error("App already initialized.");
    }

    // create express server application
    this._express = express();
    this._port = process.env.PORT || "3001";

    // init middlewares and express components
    this._express.use(helmet());
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: false }));

    // init routes
    setupRoutes(this._express);

    // start server and listen requests 🔥
    this._server = this._express.listen(this._port, () => {
      if (ready) ready(this);
      return console.log(`Server is listening on port ${this._port}...`);
    });

    process.on("SIGTERM", () => this.shutDown());
    process.on("SIGINT", () => this.shutDown());

    return this;
  }

  private shutDown() {
    if (!this._server) return;

    this._server.close(() => {
      console.log("Closing out connections and stopping server...");
    });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down..."
      );
      process.exit(1);
    }, 10000);
  }
}

export const Server = AppServer.getInstance();
