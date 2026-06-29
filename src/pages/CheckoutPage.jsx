import { useNavigate, Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { placeOrder } from '../api/orders';
import { useCart } from '../hooks/useCart';
import { QUERY_KEYS } from '../constants/queryKeys';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function CheckoutPage() {
  const { items, cartTotal, isLoading } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.orders] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cart] });
      toast.success('Order placed successfully!');
      navigate('/orders');
    },
    onError: () => toast.error('Failed to place order. Please try again.'),
  });

  if (!isLoading && items.length === 0) {
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

      <form onSubmit={handleSubmit(() => mutate())}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" {...register('name', { required: 'Name is required' })} error={errors.name?.message} placeholder="John Doe" />
                <Input label="Email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' } })} error={errors.email?.message} placeholder="john@example.com" />
                <div className="md:col-span-2">
                  <Input label="Address" {...register('address', { required: 'Address is required' })} error={errors.address?.message} placeholder="123 Main St" />
                </div>
                <Input label="City" {...register('city', { required: 'City is required' })} error={errors.city?.message} placeholder="New York" />
                <Input label="ZIP Code" {...register('zipCode', { required: 'ZIP code is required' })} error={errors.zipCode?.message} placeholder="10001" />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input label="Card Number" {...register('cardNumber', { required: 'Card number is required' })} error={errors.cardNumber?.message} placeholder="1234 5678 9012 3456" />
                </div>
                <Input label="Expiry Date" {...register('expiryDate', { required: 'Expiry date is required' })} error={errors.expiryDate?.message} placeholder="MM/YY" />
                <Input label="CVV" {...register('cvv', { required: 'CVV is required' })} error={errors.cvv?.message} placeholder="123" />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.productName ?? item.name} x{item.quantity}</span>
                    <span className="font-medium">${((item.price ?? item.unitPrice) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${Number(cartTotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${Number(cartTotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full mt-6" loading={isPending}>
                Place Order
              </Button>
              {isError && (
                <p className="mt-2 text-sm text-red-600 text-center">Failed to place order. Please try again.</p>
              )}
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
