import type { ListProductsUseCase } from '@application/use-cases/list-products';
import { ListProductsController } from '@presentation/controllers/list-products-controller';
import { ok, serverError } from '@presentation/helpers/http-helpers';
import { type HttpRequest } from '@presentation/protocols/http';

describe('ListProductsController', () => {
  let listProductsUseCase: jest.Mocked<ListProductsUseCase>;
  let listProductsController: ListProductsController;

  beforeEach(() => {
    listProductsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<ListProductsUseCase>;

    listProductsController = new ListProductsController(listProductsUseCase);
  });

  it('should return products on success', async () => {
    const products = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        price: 100,
        quantity: 10,
        category: 'Category 1',
        tags: ['tag1'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    listProductsUseCase.execute.mockResolvedValue(products);

    const httpRequest: HttpRequest = {};

    const response = await listProductsController.handle(httpRequest);

    expect(response).toEqual(ok(products));
    expect(listProductsUseCase.execute).toHaveBeenCalled();
  });

  it('should return server error if execute throws', async () => {
    const error = new Error('Server error');
    listProductsUseCase.execute.mockRejectedValue(error);

    const httpRequest: HttpRequest = {};

    const response = await listProductsController.handle(httpRequest);

    expect(response).toEqual(serverError(error));
    expect(listProductsUseCase.execute).toHaveBeenCalled();
  });
});
