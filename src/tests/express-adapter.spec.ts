import { adaptRoute } from '@core/adapters/express-adapter';
import type { Controller } from '@presentation/protocols/controller';
import type { HttpRequest, HttpResponse } from '@presentation/protocols/http';
import type { Request, Response } from 'express';

describe('Express Adapter', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockController: Controller;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockRequest = {
      body: { name: 'Test Product' },
      params: { id: '123' },
      query: { sort: 'asc' },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: mockJson,
    };
    mockController = {
      handle: jest.fn(),
    };
  });

  it('should call controller handle with correct request', async () => {
    const adaptedRoute = adaptRoute(mockController);

    const mockHttpRequest: HttpRequest = {
      body: mockRequest.body,
      params: mockRequest.params,
      query: mockRequest.query,
    };

    const expectedResponse: HttpResponse = {
      statusCode: 200,
      body: { success: true },
    };

    (mockController.handle as jest.Mock).mockResolvedValue(expectedResponse);

    await adaptedRoute(mockRequest as Request, mockResponse as Response);

    expect(mockController.handle).toHaveBeenCalledWith(mockHttpRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ success: true });
  });

  it('should handle error response properly', async () => {
    const adaptedRoute = adaptRoute(mockController);

    const expectedErrorResponse: HttpResponse = {
      statusCode: 400,
      body: { message: 'Bad request' },
    };

    (mockController.handle as jest.Mock).mockResolvedValue(
      expectedErrorResponse,
    );

    await adaptedRoute(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({ error: 'Bad request' });
  });
});
