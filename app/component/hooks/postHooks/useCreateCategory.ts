import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../api/API";

interface CategoryResponse {
  name: string;
  userId: string;
}

const createCategory = async (name: string): Promise<CategoryResponse> => {
  const token = localStorage.getItem("token");
  const response = await API.post(
    "/create-category",
    { name },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (!response.data) {
    throw new Error("Failed to create category");
  }

  return response.data;
};

const useCreateCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<CategoryResponse, Error, string>({
    mutationFn: createCategory,
    onSuccess: () => {
      // Invalidate the category query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
      onSuccess();
    },
    onError,
  });
};

export { useCreateCategory };
