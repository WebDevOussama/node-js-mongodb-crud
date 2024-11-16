import { type Controller } from '@presentation/protocols/controller';
import { type HttpRequest } from '@presentation/protocols/http';
import { type Request, type Response } from 'express';

const SUCCESS_STATUS_RANGE = { min: 200, max: 299 };

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
    };

    const httpResponse = await controller.handle(httpRequest);

    const { statusCode, body } = httpResponse;
    if (
      statusCode >= SUCCESS_STATUS_RANGE.min &&
      statusCode <= SUCCESS_STATUS_RANGE.max
    ) {
      res.status(statusCode).json(body);
    } else {
      res.status(statusCode).json({
        error: body.message,
      });
    }
  };
};
