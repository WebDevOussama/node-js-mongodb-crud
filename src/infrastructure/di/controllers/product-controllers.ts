import type { CreateProductUseCase } from '@application/use-cases/create-product';
import type { ListProductsUseCase } from '@application/use-cases/list-products';
import { CreateProductController } from '@presentation/controllers/create-product-controller';
import { ListProductsController } from '@presentation/controllers/list-products-controller';
import type { Validator } from '@presentation/protocols/validator';
import { container } from 'tsyringe';

container.register('CreateProductController', {
  useFactory: () => {
    const createProductUseCase = container.resolve<CreateProductUseCase>(
      'CreateProductUseCase',
    );
    const createProductValidator = container.resolve<Validator>(
      'CreateProductValidator',
    );

    return new CreateProductController(
      createProductUseCase,
      createProductValidator,
    );
  },
});

container.register('ListProductsController', {
  useFactory: () => {
    const listProductsUseCase = container.resolve<ListProductsUseCase>(
      'ListProductsUseCase',
    );
    return new ListProductsController(listProductsUseCase);
  },
});
