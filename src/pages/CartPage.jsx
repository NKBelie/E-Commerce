import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Card from '../components/Card';

export default function CartPage() {
    const { items, cartTotal, updateCartItem, removeFromCart } = useCart();

    if (items.length === 0) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart.</p>
            <Link to="/" className="mt-4 inline-block">
                <Button variant="primary">Continue Shopping</Button>
            </Link>
            </Card>
        </div>
        );
    }

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
        await updateCartItem(itemId, newQuantity);
        } catch (error) {
        alert('Failed to update quantity');
        }
    };

    const handleRemove = async (itemId) => {
        try {
        await removeFromCart(itemId);
        } catch (error) {
        alert('Failed to remove item');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
                <Card key={item.id} className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        </div>
                    )}
                    </div>

                    <div className="flex-1">
                    <Link to={`/products/${item.productId}`} className="font-semibold text-gray-900 hover:text-blue-600">
                        {item.name}
                    </Link>
                    <p className="text-blue-600 font-bold">${item.price?.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        +
                    </button>
                    </div>

                    <div className="text-right">
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm mt-1"
                    >
                        Remove
                    </button>
                    </div>
                </div>
                </Card>
            ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                    </div>
                </div>
                </div>
                <Link to="/checkout">
                <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                </Button>
                </Link>
                <Link to="/" className="block text-center mt-4 text-blue-600 hover:text-blue-700">
                Continue Shopping
                </Link>
            </Card>
            </div>
        </div>
        </div>
    );
}