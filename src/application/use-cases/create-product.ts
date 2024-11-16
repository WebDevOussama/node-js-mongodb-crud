import type { ICreateProductDTO } from '@application/dto/create-product';
import type { IProductRepository } from '@application/repositories/product-repository';
import type Product from '@domain/entities/product';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(product: ICreateProductDTO): Promise<Product> {
    return await this.productRepository.create(product);
  }
}
