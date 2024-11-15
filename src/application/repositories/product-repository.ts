import { Product } from '@domain/entities/product';
import { ICreateProductDTO } from '@application/dto/create-product';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: ICreateProductDTO): Promise<Product>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
