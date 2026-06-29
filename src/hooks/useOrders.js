import { useQuery } from '@tanstack/react-query';
import { fetchOrders, fetchOrderById } from '../api/orders';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useOrders() {
  return useQuery({
    queryKey: [QUERY_KEYS.orders],
    queryFn: fetchOrders,
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.order, id],
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
  });
}
