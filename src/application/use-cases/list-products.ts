import { IProductRepository } from "@application/repositories/product-repository";

export class ListProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
