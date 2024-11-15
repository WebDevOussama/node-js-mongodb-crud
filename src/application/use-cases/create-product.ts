import { ICreateProductDTO } from "@application/dto/create-product";
import { IProductRepository } from "@application/repositories/product-repository";
import { Product } from "@domain/entities/product";

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(product: ICreateProductDTO): Promise<Product> {
    return await this.productRepository.create(product);
  }
}
