import type { CreateProductUseCase } from '@application/use-cases/create-product';
import { CreateProductController } from '@presentation/controllers/create-product-controller';
import {
  badRequest,
  created,
  serverError,
} from '@presentation/helpers/http-helpers';
import { type HttpRequest } from '@presentation/protocols/http';
import type { Validator } from '@presentation/protocols/validator';
import { mock, type MockProxy } from 'jest-mock-extended';

describe('CreateProductController', () => {
  let createProductUseCase: MockProxy<CreateProductUseCase>;
  let validator: MockProxy<Validator>;
  let sut: CreateProductController;

  beforeEach(() => {
    createProductUseCase = mock<CreateProductUseCase>();
    validator = mock<Validator>();
    sut = new CreateProductController(createProductUseCase, validator);
  });

  it('should return 400 if validation fails', async () => {
    const request: HttpRequest = {
      body: {
        name: '',
        description: 'Sample description',
        price: 100,
        quantity: 10,
        category: 'Electronics',
        tags: ['tag1', 'tag2'],
      },
    };

    validator.validate.mockResolvedValue(new Error('Validation error'));

    const response = await sut.handle(request);

    expect(response).toEqual(badRequest(new Error('Validation error')));
    expect(validator.validate).toHaveBeenCalledWith(request.body);
  });

  it('should return 201 when product is created successfully', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Product A',
        description: 'Sample description',
        price: 100,
        quantity: 10,
        category: 'Electronics',
        tags: ['tag1', 'tag2'],
      },
    };

    const createdProduct = {
      id: '123',
      name: 'Product A',
      description: 'Sample description',
      price: 100,
      quantity: 10,
      category: 'Electronics',
      tags: ['tag1', 'tag2'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    validator.validate.mockResolvedValue(undefined);
    createProductUseCase.execute.mockResolvedValue(createdProduct);

    const response = await sut.handle(request);

    expect(response).toEqual(created(createdProduct));
    expect(validator.validate).toHaveBeenCalledWith(request.body);
    expect(createProductUseCase.execute).toHaveBeenCalledWith(request.body);
  });

  it('should return 500 if CreateProductUseCase throws an error', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Product A',
        description: 'Sample description',
        price: 100,
        quantity: 10,
        category: 'Electronics',
        tags: ['tag1', 'tag2'],
      },
    };

    const error = new Error('Unexpected error');
    validator.validate.mockResolvedValue(undefined);
    createProductUseCase.execute.mockRejectedValue(error);

    const response = await sut.handle(request);

    expect(response).toEqual(serverError(error));
  });
});
