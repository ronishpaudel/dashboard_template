import { z } from "zod";

export const schema = z.object({
  productName: z.string().min(2, "This field is required").max(20),
  description: z.string().min(20, "Minimum 20 characters required"),
  sellingPrice: z.number().min(1),
  crossedPrice: z.number().optional(),
  quantity: z.number().min(1),
  productImages: z.array(z.instanceof(File)),
  categoryId: z.string().min(1, "Category is required"),
  variant: z.string().min(2).max(20),
  size: z.array(z.string().min(1)).nonempty("At least one size is required"),
  status: z.enum(["Active", "Draft"]),
});
