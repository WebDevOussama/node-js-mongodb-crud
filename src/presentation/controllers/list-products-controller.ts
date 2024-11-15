import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import { ListProductsUseCase } from '@application/use-cases/list-products';
import { ok, serverError } from '../helpers/http-helpers';

export class ListroductsController implements Controller {
  constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

  async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.listProductsUseCase.execute();

      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
