import { z } from 'zod';

const MIN_STRING_LENGTH = 1;
const MIN_QUANTITY = 0;
const MIN_TAGS_LENGTH = 1;

export const zodCreateProductObject = z.strictObject({
  name: z.string().min(MIN_STRING_LENGTH, 'Name is required'),
  description: z.string().min(MIN_STRING_LENGTH, 'Description is required'),
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().int().min(MIN_QUANTITY, 'Quantity must be at least 0'),
  category: z.string().min(MIN_STRING_LENGTH, 'Category is required'),
  tags: z
    .array(z.string().min(MIN_STRING_LENGTH, 'Tags must be non-empty'))
    .min(MIN_TAGS_LENGTH, 'At least one tag is required'),
});
