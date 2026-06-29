import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { placeOrder } from '../api/orders';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const placeOrderMutation = useMutation({
        mutationFn: placeOrder,
        onSuccess: () => {
            clearCart();
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            navigate('/orders');
        },
    });

    const onSubmit = (data) => {
        const orderData = {
            customer: {
                name: data.name,
                email: data.email,
                address: data.address,
                city: data.city,
                zipCode: data.zipCode,
            },
            payment: {
                cardNumber: data.cardNumber,
                expiryDate: data.expiryDate,
                cvv: data.cvv,
            },
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            })),
            total: cartTotal,
        };

        placeOrderMutation.mutate(orderData);
    };

    if (items.length === 0 && !placeOrderMutation.isSuccess) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-gray-600">Add some items before checking out.</p>
            <Link to="/" className="mt-4 inline-block">
                <Button variant="primary">Continue Shopping</Button>
            </Link>
            </Card>
        </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {placeOrderMutation.isSuccess ? (
            <Card className="p-8 text-center">
            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
            <p className="mt-2 text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <Link to="/orders" className="mt-6 inline-block">
                <Button variant="primary">View Orders</Button>
            </Link>
            </Card>
        ) : (
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        label="Full Name"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message}
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email is invalid',
                            },
                        })}
                        error={errors.email?.message}
                        placeholder="john@example.com"
                    />
                    <div className="md:col-span-2">
                        <Input
                        label="Address"
                        {...register('address', { required: 'Address is required' })}
                        error={errors.address?.message}
                        placeholder="123 Main St"
                        />
                    </div>
                    <Input
                        label="City"
                        {...register('city', { required: 'City is required' })}
                        error={errors.city?.message}
                        placeholder="New York"
                    />
                    <Input
                        label="ZIP Code"
                        {...register('zipCode', { required: 'ZIP code is required' })}
                        error={errors.zipCode?.message}
                        placeholder="10001"
                    />
                    </div>
                </Card>

                {/* Payment Information */}
                <Card className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <Input
                        label="Card Number"
                        {...register('cardNumber', { required: 'Card number is required' })}
                        error={errors.cardNumber?.message}
                        placeholder="1234 5678 9012 3456"
                        />
                    </div>
                    <Input
                        label="Expiry Date"
                        {...register('expiryDate', { required: 'Expiry date is required' })}
                        error={errors.expiryDate?.message}
                        placeholder="MM/YY"
                    />
                    <Input
                        label="CVV"
                        {...register('cvv', { required: 'CVV is required' })}
                        error={errors.cvv?.message}
                        placeholder="123"
                    />
                    </div>
                </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                <Card className="p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                    <div className="space-y-3 mb-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.name} x{item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    </div>
                    <div className="border-t border-gray-200 pt-3 space-y-2">
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
                    <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    loading={placeOrderMutation.isPending}
                    >
                    Place Order
                    </Button>
                    {placeOrderMutation.isError && (
                    <p className="mt-2 text-sm text-red-600 text-center">
                        Failed to place order. Please try again.
                    </p>
                    )}
                </Card>
                </div>
            </div>
            </form>
        )}
        </div>
    );
}