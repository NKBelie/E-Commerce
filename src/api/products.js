import { apiClient } from './client';

export const fetchProducts = async ({ search = '', category = '', page = 1, limit = 12 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  params.append('page', page);
  params.append('limit', limit);

  const { data } = await apiClient.get(`/products?${params.toString()}`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await apiClient.get('/categories');
  return data;
};