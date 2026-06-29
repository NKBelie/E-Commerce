import { apiClient } from './client';
import { mockFetchProducts, mockFetchProductById, mockFetchCategories } from './mock';

export const fetchProducts = async ({ search = '', category = '', page = 1, limit = 12 } = {}) => {
    try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        params.append('page', page);
        params.append('limit', limit);

        const { data } = await apiClient.get(`/products?${params.toString()}`);
        return data;
    } catch (error) {
        console.warn('API not available, using mock data');
        return mockFetchProducts({ search, category, page, limit });
    }
    };

export const fetchProductById = async (id) => {
    try {
        const { data } = await apiClient.get(`/products/${id}`);
        return data;
    } catch (error) {
        console.warn('API not available, using mock data');
        return mockFetchProductById(id);
    }
    };

export const fetchCategories = async () => {
    try {
        const { data } = await apiClient.get('/categories');
        return data;
    } catch (error) {
        console.warn('API not available, using mock data');
        return mockFetchCategories();
    }
    };
