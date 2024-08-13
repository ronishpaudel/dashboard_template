import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../api/API";

const deleteCategory = async (id: number) => {
  const response = await API.delete(`/remove-category/${id}`);

  if (!response.data) {
    throw new Error("Failed to delete category");
  }

  return response.data;
};

const useDeleteCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      onSuccess();
    },
    onError,
  });
};

export { useDeleteCategory };
