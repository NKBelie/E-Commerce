import { apiClient } from './client';

export const fetchCart = async () => {
  const { data } = await apiClient.get('/cart');
  return data;
};

export const addToCart = async ({ productId, quantity = 1 }) => {
  const { data } = await apiClient.post('/cart/items', { productId, quantity });
  return data;
};

export const updateCartItem = async ({ itemId, quantity }) => {
  const { data } = await apiClient.put(`/cart/items/${itemId}`, { quantity });
  return data;
};

export const removeFromCart = async (itemId) => {
  const { data } = await apiClient.delete(`/cart/items/${itemId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await apiClient.delete('/cart');
  return data;
};