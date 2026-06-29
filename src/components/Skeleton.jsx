export default function Skeleton({ className = '', variant = 'rectangular' }) {
    const variants = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div
            className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full flex flex-col">
            <Skeleton className="aspect-square mb-3" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-10 w-full mt-auto" />
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-4">
                <Skeleton className="w-20 h-20 rounded-lg" />
                <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    );
}