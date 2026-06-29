import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, fetchProductById } from '../api/products';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useProducts({ search, categoryId, page }) {
  return useQuery({
    queryKey: [QUERY_KEYS.products, { search, categoryId, page }],
    queryFn: () => fetchProducts({ search, categoryId, page }),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: fetchCategories,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.product, id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}
