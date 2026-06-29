import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '../api/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import { ProductCardSkeleton } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function HomePage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ['products', { search, category, page }],
        queryFn: () => fetchProducts({ search, category, page }),
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setPage(1);
    };

    const categories = categoriesData?.data || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
                <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search products..."
                />
            </div>
            <div className="md:w-64">
                <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
                </select>
            </div>
            <Button type="submit" variant="primary">
                Search
            </Button>
            </form>
        </div>

        {/* Loading State with Skeleton */}
        {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
            </div>
        )}

        {/* Error State */}
        {error && (
            <ErrorMessage
            title="Failed to load products"
            message="Unable to fetch products. Please check your connection and try again."
            />
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
            <>
            {data?.data?.length === 0 ? (
                <EmptyState
                title="No products found"
                message="Try adjusting your search or filter criteria to find what you're looking for."
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}

            {/* Pagination */}
            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="mt-8">
                <Pagination
                    currentPage={page}
                    totalPages={data.pagination.totalPages}
                    onPageChange={setPage}
                />
                </div>
            )}

            {isFetching && !isLoading && (
                <div className="text-center text-sm text-gray-500 mt-4">
                Updating...
                </div>
            )}
            </>
        )}
        </div>
    );
}