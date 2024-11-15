import { GetAllProductsController } from "@presentation/controllers/GetAllProductsController";
import { GetAllProducts } from "@application/use-cases/GetAllProducts";
import { MongoProductRepository } from "@infrastructure/repositories/MongoProductRepository";

export const makeListProducts = (): GetAllProductsController => {
  const mongoProductRepository = new MongoProductRepository();
  const listProductsUseCase = new GetAllProducts(mongoProductRepository);

  return new GetAllProductsController(listProductsUseCase);
};
