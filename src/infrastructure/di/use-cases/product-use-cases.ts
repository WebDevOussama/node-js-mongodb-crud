import { CreateProductUseCase } from '@application/use-cases/create-product';
import { ListProductsUseCase } from '@application/use-cases/list-products';
import { container } from 'tsyringe';

container.register('CreateProductUseCase', CreateProductUseCase);
container.register('ListProductsUseCase', ListProductsUseCase);
