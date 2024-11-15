import { Product } from "@domain/entities/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<void>;
  delete(product: Product): Promise<void>;
}
