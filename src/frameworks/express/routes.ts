import { type Express, Router } from 'express';
import { container } from 'tsyringe';
import { adaptRoute } from '../adapters/express-adapter';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  router.post(
    '/product',
    adaptRoute(container.resolve('CreateProductController')),
  );
  router.get(
    '/product',
    adaptRoute(container.resolve('ListProductsController')),
  );
};
