import { type Controller } from "../protocols/controller";
import { type HttpRequest, type HttpResponse } from "../protocols/http";
import { GetAllProducts } from "@application/use-cases/GetAllProducts";
import { ok, serverError } from "../helpers/http-helper";

export class GetAllProductsController implements Controller {
  constructor(private readonly getAllProducts: GetAllProducts) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.getAllProducts.execute();

      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
