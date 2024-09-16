import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Optional: For notifications
import { API } from "../../api/API";

export interface ProductData {
  name: string;
  description: string;
  price?: string;
  crossedPrice?: string;
  imageUrl?: string;
  thumbImageUrl?: string;
  size?: string;
  status?: string;
  flag: boolean;
  categoryId: number;
  userId: number;
}

// Mutation function to create a product
const createProduct = async (productData: ProductData) => {
  const response = await API.post("/create-product", productData);
  return response.data;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success("Product created successfully!");
      console.log("Success:", data);
    },
    onError: (error: any) => {
      toast.error("Failed to create product");
      console.error("Error:", error.message);
    },
  });
};
