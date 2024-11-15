import { Server } from "./frameworks/express/server";
import dotenv from "dotenv";

function bootstrap() {
  dotenv.config();

  Server.initializeServer();
}

bootstrap();
