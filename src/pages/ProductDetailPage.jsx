import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/products';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        enabled: !!id,
    });

    const product = data?.data;

    const handleAddToCart = async () => {
        try {
        await addToCart(product.id, 1);
        } catch (error) {
        // Error is already handled in CartContext with toast
        }
    };

    if (isLoading) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center py-12">
            <Loader size="lg" />
            </div>
        </div>
        );
    }

    if (error || !product) {
        return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorMessage
            title="Product not found"
            message="The product you're looking for doesn't exist or has been removed."
            />
            <div className="mt-4 text-center">
            <Link to="/">
                <Button variant="primary">Back to Products</Button>
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Products</span>
            </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square">
            {product.image ? (
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                </div>
            )}
            </div>

            {/* Product Info */}
            <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-6">${product.price?.toFixed(2)}</p>
            <Card className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{product.description || 'No description available.'}</p>
            </Card>

            {product.category && (
                <div className="mb-6">
                <Badge variant="primary">{product.category}</Badge>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1"
                >
                Add to Cart
                </Button>
            </div>

            {product.stock !== undefined && (
                <p className="mt-4 text-sm text-gray-600">
                {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                    <span className="text-red-600">Out of Stock</span>
                )}
                </p>
            )}
            </div>
        </div>
        </div>
    );
}