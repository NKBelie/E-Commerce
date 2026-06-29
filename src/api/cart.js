import apiClient from './client';
import { getUserId } from '../utils/userId';

export const fetchCart = async () => {
  const { data } = await apiClient.get(`/api/cart?userId=${getUserId()}`);
  return data;
};

export const addToCart = async ({ productId, variantId, quantity = 1 }) => {
  const { data } = await apiClient.post('/api/cart/items', {
    userId: getUserId(),
    productId,
    variantId,
    quantity,
  });
  return data;
};

export const updateCartItem = async ({ itemId, quantity }) => {
  const { data } = await apiClient.patch(`/api/cart/items/${itemId}`, {
    userId: getUserId(),
    quantity,
  });
  return data;
};

export const removeFromCart = async (itemId) => {
  const { data } = await apiClient.delete(`/api/cart/items/${itemId}?userId=${getUserId()}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await apiClient.delete(`/api/cart?userId=${getUserId()}`);
  return data;
};
