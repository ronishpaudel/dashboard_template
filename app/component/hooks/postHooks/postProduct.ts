import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { z } from "zod";
import { API } from "../../api/API";

const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().min(0, "Price must be a positive number"),
  crossedPrice: z.number().min(0, "Price must be a positive number"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
});

export type ProductData = z.infer<typeof productSchema>;

const createProduct = async (
  productData: ProductData
): Promise<ProductData> => {
  const response = await API.post("/create-product", productData);
  return response.data;
};

export const useProductMutation = (): UseMutationResult<
  ProductData,
  Error,
  ProductData
> => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log("Product created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};
