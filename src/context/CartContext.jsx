import { createContext, useContext, useReducer, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCart, addToCart as apiAddToCart, updateCartItem as apiUpdateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from '../api/cart';
import { toast } from 'sonner';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload;
        case 'ADD_ITEM':
            const existingIndex = state.items.findIndex(item => item.productId === action.payload.productId);
            if (existingIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    quantity: updatedItems[existingIndex].quantity + (action.payload.quantity || 1),
                };
                return { ...state, items: updatedItems };
            }
            return { ...state, items: [...state.items, action.payload] };
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.itemId ? { ...item, quantity: action.payload.quantity } : item
                ),
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.itemId),
            };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const queryClient = useQueryClient();

    // Load cart from API on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const cart = await fetchCart();
                dispatch({ type: 'SET_CART', payload: cart });
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        };
        loadCart();
    }, []);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const updatedCart = await apiAddToCart({ productId, quantity });
            dispatch({ type: 'SET_CART', payload: updatedCart });
            toast.success('Product added to cart!');
            // Invalidate cart query to keep it in sync
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Failed to add to cart:', error);
            toast.error('Failed to add product to cart');
            throw error;
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            const updatedCart = await apiUpdateCartItem({ itemId, quantity });
            dispatch({ type: 'SET_CART', payload: updatedCart });
            toast.success('Cart updated!');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Failed to update cart item:', error);
            toast.error('Failed to update cart');
            throw error;
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const updatedCart = await apiRemoveFromCart(itemId);
            dispatch({ type: 'SET_CART', payload: updatedCart });
            toast.success('Item removed from cart');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            toast.error('Failed to remove item');
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await apiClearCart();
            dispatch({ type: 'CLEAR_CART' });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Failed to clear cart:', error);
            toast.error('Failed to clear cart');
            throw error;
        }
    };

    const cartTotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                cartTotal,
                cartCount,
                addToCart,
                updateCartItem,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
