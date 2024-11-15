import type { CreateProductUseCase } from '@application/use-cases/create-product';
import { inject, injectable } from 'tsyringe';
import { badRequest, created, serverError } from '../helpers/http-helpers';
import { type Controller } from '../protocols/controller';
import { type HttpRequest, type HttpResponse } from '../protocols/http';
import type { Validator } from '../protocols/validator';

@injectable()
export class CreateProductController implements Controller {
  constructor(
    @inject('CreateProductUseCase')
    private readonly createProductUseCase: CreateProductUseCase,
    @inject('Validator')
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestErrors = await this.validator.validate(httpRequest.body);

      if (requestErrors) {
        return badRequest(requestErrors);
      }

      const { name, description, price, quantity, category, tags } =
        httpRequest.body;

      const result = await this.createProductUseCase.execute({
        name,
        description,
        price,
        quantity,
        category,
        tags,
      });

      return created(result);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
