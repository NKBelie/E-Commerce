import { Link } from 'react-router-dom';
import Button from './Button';

export default function CartItem({
    item,
    onQuantityChange,
    onRemove,
    showImage = true,
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
                {showImage && (
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <Link
                        to={`/products/${item.productId}`}
                        className="font-semibold text-gray-900 hover:text-blue-600 truncate block"
                    >
                        {item.name}
                    </Link>
                    <p className="text-blue-600 font-bold">${item.price?.toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                    >
                        <span className="text-gray-600">−</span>
                    </button>
                    <span className="w-12 text-center font-medium text-gray-900">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                    >
                        <span className="text-gray-600">+</span>
                    </button>
                </div>

                <div className="text-right min-w-20">
                    <p className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm mt-1 transition-colors"
                        aria-label="Remove item"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}