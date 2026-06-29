import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../hooks/useOrders';
import { getOrderStatusVariant } from '../constants/orderStatus';
import { formatDate } from '../utils/format';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Badge from '../components/Badge';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useOrder(id);
  const order = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loader size="lg" className="py-12" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage title="Order not found" message="The order you're looking for doesn't exist or has been removed." />
        <div className="mt-4 text-center">
          <Link to="/orders"><Button variant="primary">Back to Orders</Button></Link>
        </div>
      </div>
    );
  }

  const total = order.total ?? order.totalAmount ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6">
        <Link to="/orders" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Orders</span>
        </Link>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order #{order.id.slice(-8).toUpperCase()}
        </h1>
        <p className="text-gray-600">{formatDate(order.createdAt)}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item, index) => {
                const itemPrice = item.price ?? item.unitPrice ?? 0;
                return (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.productName ?? `Product`}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${Number(itemPrice).toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-gray-900">${(itemPrice * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Order Status</h3>
                <Badge variant={getOrderStatusVariant(order.status)}>{order.status}</Badge>
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${Number(total).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${Number(total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
