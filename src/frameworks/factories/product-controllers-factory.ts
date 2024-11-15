import type { CreateProductController } from '@presentation/controllers/create-product-controller';
import type { ListProductsController } from '@presentation/controllers/list-products-controller';
import { container } from 'tsyringe';

export const makeListProducts = (): ListProductsController => {
  return container.resolve('ListProductsController');
};

export const makeCreateProduct = (): CreateProductController => {
  return container.resolve('CreateProductController');
};
