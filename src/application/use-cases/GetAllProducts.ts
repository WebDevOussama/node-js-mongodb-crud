import { IProductRepository } from "@application/interfaces/IProductRepository";

export class GetAllProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
