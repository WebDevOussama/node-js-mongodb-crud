import type { ICreateProductDTO } from '@application/dto/create-product';
import type { Product } from '@domain/entities/Product';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: ICreateProductDTO): Promise<Product>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
