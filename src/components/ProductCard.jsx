import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Card from './Card';
import Button from './Button';

function AddToCartButton({ productId, variantId }) {
  const { addToCart, isAddingToCart } = useCart();

  return (
    <Button
      variant="primary"
      className="w-full"
      loading={isAddingToCart}
      onClick={async (e) => {
        e.preventDefault();
        try {
          await addToCart(productId, variantId, 1);
        } catch {
          // handled in useCart with toast
        }
      }}
    >
      Add to Cart
    </Button>
  );
}

export default function ProductCard({ product }) {
  if (!product) return null;

  const variantId = product.variants?.[0]?.id;
  const price = product.variants?.[0]?.price ?? product.price;
  const image = product.images?.[0]?.url ?? product.variants?.[0]?.images?.[0]?.url
    ?? `https://picsum.photos/seed/${product.id}/400/400`;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`} className="flex-1">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
          {image ? (
            <img src={image} alt={product.name} className="w-full h-full object-cover" />
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
        <p className="text-lg font-bold text-blue-600">${Number(price).toFixed(2)}</p>
      </Link>
      <div className="mt-3">
        {variantId ? (
          <AddToCartButton productId={product.id} variantId={variantId} />
        ) : (
          <Button variant="secondary" className="w-full" disabled>Unavailable</Button>
        )}
      </div>
    </Card>
  );
}
