import type { IProductRepository } from '@application/repositories/product-repository';
import { MongoProductRepository } from '@infrastructure/repositories/mongo-product-repository';
import { container } from 'tsyringe';

container.register<IProductRepository>('IProductRepository', {
  useClass: MongoProductRepository,
});
