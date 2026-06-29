import { apiClient } from './client';

export const placeOrder = async (orderData) => {
    const { data } = await apiClient.post('/orders', orderData);
    return data;
    };

export const fetchOrders = async () => {
    const { data } = await apiClient.get('/orders');
    return data;
    };

export const fetchOrderById = async (id) => {
    const { data } = await apiClient.get(`/orders/${id}`);
    return data;
};