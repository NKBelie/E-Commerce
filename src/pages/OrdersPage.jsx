import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { getOrderStatusVariant } from '../constants/orderStatus';
import { formatDate } from '../utils/format';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useOrders();
  const orders = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader size="lg" className="py-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage title="Failed to load orders" message="Unable to fetch your order history. Please try again later." />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="No orders yet"
          message="Start shopping to place your first order."
          actionLabel="Start Shopping"
          onAction={() => navigate('/')}
        />
      </div>
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
                  <h2 className="text-lg font-bold text-gray-900">Order #{order.id.slice(-8).toUpperCase()}</h2>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Badge variant={getOrderStatusVariant(order.status)}>{order.status}</Badge>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2 mb-4">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.productName ?? `Product`} x{item.quantity}</span>
                      <span className="font-medium">${((item.price ?? item.unitPrice) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${Number(order.total ?? order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
