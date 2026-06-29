import apiClient from './client';
import { getUserId } from '../utils/userId';

export const placeOrder = async () => {
  const { data } = await apiClient.post('/api/orders', { userId: getUserId() });
  return data;
};

export const fetchOrders = async () => {
  const { data } = await apiClient.get(`/api/orders?userId=${getUserId()}`);
  return data;
};

export const fetchOrderById = async (id) => {
  const { data } = await apiClient.get(`/api/orders/${id}`);
  return data;
};
