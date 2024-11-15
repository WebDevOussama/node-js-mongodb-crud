import type { ListProductsUseCase } from '@application/use-cases/list-products';
import { inject, injectable } from 'tsyringe';
import { ok, serverError } from '../helpers/http-helpers';
import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';

@injectable()
export class ListProductsController implements Controller {
  constructor(
    @inject('ListProductsUseCase')
    private readonly listProductsUseCase: ListProductsUseCase,
  ) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.listProductsUseCase.execute();

      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
