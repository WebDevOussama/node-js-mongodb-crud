import type { ICreateProductDTO } from '@application/dto/create-product';
import type { IProductRepository } from '@application/repositories/product-repository';
import { CreateProductUseCase } from '@application/use-cases/create-product';
import { Product } from '@domain/entities/Product';

describe('CreateProductUseCase', () => {
  let productRepository: jest.Mocked<IProductRepository>;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  it('should create a new product successfully', async () => {
    // Arrange
    const productDTO: ICreateProductDTO = {
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 100,
      quantity: 10,
      category: 'Category A',
      tags: ['tag1', 'tag2'],
    };

    const product = new Product(
      '1',
      productDTO.name,
      productDTO.description,
      productDTO.price,
      productDTO.quantity,
      productDTO.category,
      productDTO.tags,
      new Date(),
      new Date(),
    );

    productRepository.create.mockResolvedValue(product);

    // Act
    const result = await createProductUseCase.execute(productDTO);

    // Assert
    expect(productRepository.create).toHaveBeenCalledWith(productDTO);
    expect(result).toEqual(product);
  });

  it('should throw an error if the repository fails to create product', async () => {
    // Arrange
    const productDTO: ICreateProductDTO = {
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 150,
      quantity: 5,
      category: 'Category B',
      tags: ['tag3', 'tag4'],
    };

    productRepository.create.mockRejectedValue(new Error('Repository failure'));

    // Act & Assert
    await expect(createProductUseCase.execute(productDTO)).rejects.toThrow(
      'Repository failure',
    );
  });
});
