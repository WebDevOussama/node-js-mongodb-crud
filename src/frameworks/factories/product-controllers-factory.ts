import { ListroductsController } from "@presentation/controllers/list-products-controller";
import { ListProductsUseCase } from "@application/use-cases/list-products";
import { MongoProductRepository } from "@infrastructure/repositories/mongo-product-repository";
import { CreateProductController } from "@presentation/controllers/create-product-controller";
import { CreateProductUseCase } from "@application/use-cases/create-product";
import { ZodValidator } from "@presentation/helpers/zod-validator";
import { zodCreateProductObject } from "@presentation/helpers/zod-validators/product";

export const makeListProducts = (): ListroductsController => {
  const mongoProductRepository = new MongoProductRepository();
  const listProductsUseCase = new ListProductsUseCase(mongoProductRepository);

  return new ListroductsController(listProductsUseCase);
};

export const makeCreateProduct = (): CreateProductController => {
  const mongoProductRepository = new MongoProductRepository();
  const createProductUseCase = new CreateProductUseCase(mongoProductRepository);
  const zodCreateProductValidator = new ZodValidator(zodCreateProductObject);

  return new CreateProductController(
    createProductUseCase,
    zodCreateProductValidator
  );
};
