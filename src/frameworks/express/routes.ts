import { Router, type Express } from "express";
import { adaptRoute } from "../adapters/express-adapter";
import { makeListProducts } from "../factories/product-controllers-factory";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);

  router.get("/product", adaptRoute(makeListProducts()));
};
