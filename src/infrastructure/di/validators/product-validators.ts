import { ZodValidator } from '@presentation/helpers/zod-validator';
import { zodCreateProductObject } from '@presentation/helpers/zod-validators/product';
import { container } from 'tsyringe';

container.register('CreateProductValidator', {
  useFactory: () => new ZodValidator(zodCreateProductObject),
});
