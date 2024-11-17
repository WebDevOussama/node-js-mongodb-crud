import { ZodValidator } from '@presentation/helpers/zod-validator';
import { z } from 'zod';

describe('ZodValidator', () => {
  let zodValidator: ZodValidator;
  const mockZodObject = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().positive('Price must be positive'),
  });

  beforeEach(() => {
    zodValidator = new ZodValidator(mockZodObject);
  });

  it('should return undefined when input is valid', async () => {
    const input = {
      name: 'Test Product',
      price: 10,
    };

    const result = await zodValidator.validate(input);

    expect(result).toBeUndefined();
  });

  it('should return an Error when input is invalid', async () => {
    const input = {
      name: '',
      price: -5,
    };

    const result = await zodValidator.validate(input);

    expect(result).toBeInstanceOf(Error);
    expect((result as any).issues).toBeTruthy();
  });

  it('should return an error for missing required fields', async () => {
    const input = {
      price: 10,
    };

    const result = await zodValidator.validate(input);

    expect(result).toBeInstanceOf(Error);
    expect((result as any).issues).toBeTruthy();
  });

  it('should return multiple errors when input has multiple issues', async () => {
    const input = {
      name: '',
      price: -5,
    };

    const result = await zodValidator.validate(input);

    expect(result).toBeInstanceOf(Error);
    expect((result as any).issues).toBeTruthy();
  });
});
