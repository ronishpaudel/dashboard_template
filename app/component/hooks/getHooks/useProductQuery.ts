import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { API } from "../../api/API";
import { Product } from "@/utils/type";
import { cache } from "react";

const fetchProducts = async (context: QueryFunctionContext) => {
  const queryVal = context.queryKey[1] as string;
  const res = await API.get(`/products`, {
    params: {
      page: context.pageParam,
      pageSize: 9,
      q: queryVal || "",
    },
  });
  return res.data;
};

const fetchOneProduct = async (slug: string) => {
  const res = await API.get(`/products/${slug}`);
  return res.data as Product;
};

function useQueryProduct(queryVal: string, ...rest: any) {
  return useInfiniteQuery({
    queryKey: ["blogs", queryVal],
    queryFn: (context) => fetchProducts(context),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Product[], allPages: Product[][]) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    cacheTime: 5 * 60 * 1000,
    staleTime: 4 * 60 * 1000,
    ...rest,
  });
}

function useOneProduct(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchOneProduct(id),
    enabled: !!id,
  });
}

export { useQueryProduct, useOneProduct, fetchProducts, fetchOneProduct };
