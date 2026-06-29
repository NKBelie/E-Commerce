import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  fetchCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeFromCart as apiRemoveFromCart,
  clearCart as apiClearCart,
} from '../api/cart';
import { QUERY_KEYS } from '../constants/queryKeys';

export function useCart() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.cart],
    queryFn: fetchCart,
  });

  const invalidateCart = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, variantId, quantity }) => apiAddToCart({ productId, variantId, quantity }),
    onSuccess: () => {
      toast.success('Product added to cart!');
      invalidateCart();
    },
    onError: () => toast.error('Failed to add product to cart'),
  });

  const updateCartItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }) => apiUpdateCartItem({ itemId, quantity }),
    onSuccess: invalidateCart,
    onError: () => toast.error('Failed to update cart'),
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (itemId) => apiRemoveFromCart(itemId),
    onSuccess: () => {
      toast.success('Item removed from cart');
      invalidateCart();
    },
    onError: () => toast.error('Failed to remove item'),
  });

  const clearCartMutation = useMutation({
    mutationFn: apiClearCart,
    onSuccess: invalidateCart,
    onError: () => toast.error('Failed to clear cart'),
  });

  const items = data?.data?.cart?.items ?? [];
  const cartTotal = data?.data?.cart?.total ?? 0;
  const cartCount = data?.data?.cart?.itemCount ?? 0;

  return {
    items,
    cartTotal,
    cartCount,
    isLoading,
    addToCart: (productId, variantId, quantity = 1) =>
      addToCartMutation.mutateAsync({ productId, variantId, quantity }),
    updateCartItem: (itemId, quantity) =>
      updateCartItemMutation.mutateAsync({ itemId, quantity }),
    removeFromCart: (itemId) =>
      removeFromCartMutation.mutateAsync(itemId),
    clearCart: () => clearCartMutation.mutateAsync(),
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartItemMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
  };
}
