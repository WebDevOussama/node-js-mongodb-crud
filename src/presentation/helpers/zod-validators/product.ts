import { z } from "zod";

export const zodCreateProductObject = z.strictObject({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().min(0, "Quantity must be at least 0"),
  category: z.string().min(1, "Category is required"),
  tags: z
    .array(z.string().min(1, "Tags must be non-empty"))
    .min(1, "At least one tag is required"),
});
