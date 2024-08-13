import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

interface Category {
  id: number;
  name: string;
}
const fetchCategory = async (): Promise<Category[]> => {
  const response = await API.get("/category");

  if (!response) {
    throw new Error("Failed to fetch category data");
  }

  return response.data;
};

const useCategoryQuery = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    staleTime: 0,
    retry: 2,
  });
};

export { useCategoryQuery };
