import { Product } from "@domain/entities/Product";
import { IProductRepository } from "@application/interfaces/IProductRepository";
import { ProductModel } from "@infrastructure/models/ProductModel";

export class MongoProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    console.log(await ProductModel.find());
    return await ProductModel.find();
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new ProductModel(product);

    await newProduct.save();

    return {
      ...newProduct,
      id: newProduct._id as string,
    };
  }

  async update(product: Product): Promise<void> {
    await ProductModel.findByIdAndUpdate(product.id, product);
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }
}
