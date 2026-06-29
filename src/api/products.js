import apiClient from './client';

export const fetchProducts = async ({ search = '', categoryId = '', page = 1, limit = 12 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (categoryId) params.append('categoryId', categoryId);
  params.append('page', page);
  params.append('limit', limit);

  const { data } = await apiClient.get(`/api/products?${params}`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/api/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await apiClient.get('/api/categories?limit=50');
  return data;
};
