import type { ICreateProductDTO } from '@application/dto/create-product';
import type { IProductRepository } from '@application/repositories/product-repository';
import type { Product } from '@domain/entities/product';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(product: ICreateProductDTO): Promise<Product> {
    return await this.productRepository.create(product);
  }
}
