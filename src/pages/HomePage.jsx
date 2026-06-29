import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories } from '../api/products';
import ProductCard from '../components/ProductCard';
import Input from '../components/Input';
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
                <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

        {/* Loading State */}
        {isLoading && (
            <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )}

        {/* Error State */}
        {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Failed to load products. Please try again later.</p>
            </div>
        )}

        {/* Products Grid */}
        {!isLoading && !error && (
            <>
            {data?.data?.length === 0 ? (
                <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            )}

            {/* Pagination */}
            {data?.pagination && data.pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </Button>
                <span className="px-4 py-2 text-sm text-gray-700">
                    Page {page} of {data.pagination.totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page === data.pagination.totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </Button>
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