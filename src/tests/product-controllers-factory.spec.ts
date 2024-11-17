import {
  makeCreateProduct,
  makeListProducts,
} from '@core/factories/product-controllers-factory';
import type { CreateProductController } from '@presentation/controllers/create-product-controller';
import type { ListProductsController } from '@presentation/controllers/list-products-controller';
import { container } from 'tsyringe';

describe('Products Controller Factory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve and return an instance of ListProductsController', () => {
    // Mock the container resolve method
    const listProductsControllerInstance = {} as ListProductsController;
    jest
      .spyOn(container, 'resolve')
      .mockReturnValueOnce(listProductsControllerInstance);

    const result = makeListProducts();

    expect(container.resolve).toHaveBeenCalledWith('ListProductsController');
    expect(result).toBe(listProductsControllerInstance);
  });

  it('should resolve and return an instance of CreateProductController', () => {
    // Mock the container resolve method
    const createProductControllerInstance = {} as CreateProductController;
    jest
      .spyOn(container, 'resolve')
      .mockReturnValueOnce(createProductControllerInstance);

    const result = makeCreateProduct();

    expect(container.resolve).toHaveBeenCalledWith('CreateProductController');
    expect(result).toBe(createProductControllerInstance);
  });
});
