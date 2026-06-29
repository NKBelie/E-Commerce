import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/orders';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';
import Button from '../components/Button';

export default function OrdersPage() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
    });

    const orders = data?.data || [];

    if (isLoading) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center py-12">
            <Loader size="lg" />
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorMessage
            title="Failed to load orders"
            message="Unable to fetch your order history. Please try again later."
            />
        </div>
        );
    }

    if (orders.length === 0) {
        return (
        <EmptyState
            icon={
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            }
            title="No orders yet"
            message="Start shopping to place your first order."
            actionLabel="Start Shopping"
            onAction={() => window.location.href = '/'}
        />
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

        <div className="space-y-6">
            {orders.map((order) => (
            <Link key={order.id} to={`/order/${order.id}`}>
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </p>
                </div>
                <div className="mt-2 sm:mt-0">
                    <Badge
                    variant={
                        order.status === 'completed' || order.status === 'delivered'
                        ? 'success'
                        : order.status === 'pending' || order.status === 'processing'
                        ? 'warning'
                        : 'default'
                    }
                    >
                    {order.status}
                    </Badge>
                </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 mb-4">
                    {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                        {item.name || `Product ${item.productId}`} x{item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    ))}
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${order.total?.toFixed(2)}</span>
                </div>
                </div>

                {order.customer && (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Ship to: {order.customer.name}, {order.customer.address}, {order.customer.city}</p>
                </div>
                )}
                </Card>
            </Link>
            ))}
        </div>
        </div>
    );
}
