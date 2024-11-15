import { type Express, Router } from 'express';
import { adaptRoute } from '../adapters/express-adapter';
import {
  makeCreateProduct,
  makeListProducts,
} from '../factories/product-controllers-factory';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  router.get('/product', adaptRoute(makeListProducts()));
  router.post('/product', adaptRoute(makeCreateProduct()));
};
