import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Card from './Card';
import Button from './Button';

function AddToCartButton({ productId }) {
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart(productId, 1);
    } catch (error) {
      // Error is already handled in CartContext with toast
    }
  };

  return (
    <Button variant="primary" className="w-full" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
}

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`} className="flex-1">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">${product.price?.toFixed(2)}</p>
      </Link>
      <div className="mt-3">
        <AddToCartButton productId={product.id} />
      </div>
    </Card>
  );
}

