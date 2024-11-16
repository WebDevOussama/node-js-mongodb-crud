import type { IProductRepository } from '@application/repositories/product-repository';
import { ListProductsUseCase } from '@application/use-cases/list-products';
import Product from '@domain/entities/Product';

describe('ListProductsUseCase', () => {
  let productRepository: jest.Mocked<IProductRepository>;
  let listProductsUseCase: ListProductsUseCase;

  beforeEach(() => {
    // Create a mock product repository
    productRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Create the use case instance with the mock repository
    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  it('should return a list of products', async () => {
    // Arrange
    const products = [
      new Product(
        '1',
        'Product 1',
        'Description for Product 1',
        100,
        10,
        'Category A',
        ['tag1', 'tag2'],
        new Date(),
        new Date(),
      ),
      new Product(
        '2',
        'Product 2',
        'Description for Product 2',
        200,
        5,
        'Category B',
        ['tag3', 'tag4'],
        new Date(),
        new Date(),
      ),
    ];

    productRepository.findAll.mockResolvedValue(products);

    // Act
    const result = await listProductsUseCase.execute();

    // Assert
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(products);
  });

  it('should return an empty list if no products exist', async () => {
    // Arrange
    productRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await listProductsUseCase.execute();

    // Assert
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should throw an error if the repository fails', async () => {
    // Arrange
    productRepository.findAll.mockRejectedValue(
      new Error('Repository failure'),
    );

    // Act & Assert
    await expect(listProductsUseCase.execute()).rejects.toThrow(
      'Repository failure',
    );
  });
});
