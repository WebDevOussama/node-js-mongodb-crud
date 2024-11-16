import type { IProductRepository } from '@application/repositories/product-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListProductsUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute() {
    return await this.productRepository.findAll();
  }
}
