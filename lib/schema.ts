import { z } from "zod";

export const schema = z.object({
  productName: z.string().min(2, "This field is required").max(20),
  description: z.string().min(20, "Minimum 20 characters required"),
  sellingPrice: z.number().optional(),
  crossedPrice: z.number().optional(),
  quantity: z.number(),
  productImages: z.array(z.instanceof(File)).optional(), // Make it optional if not required
  categoryId: z.string().min(1, "Category is required"),
  variant: z.string().min(2).max(20).optional(),
  size: z.array(z.string().min(1)).nonempty("At least one size is required"),
  status: z.enum(["Active", "Draft"]),
});
