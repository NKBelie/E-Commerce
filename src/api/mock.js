// Mock data for demonstration when API is not available
export const mockProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 79.99,
        image: "https://via.placeholder.com/300",
        category: "Electronics",
        stock: 15,
        rating: 4.5
    },
    {
        id: 2,
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand for better ergonomics",
        price: 49.99,
        image: "https://via.placeholder.com/300",
        category: "Accessories",
        stock: 20,
        rating: 4.8
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        price: 129.99,
        image: "https://via.placeholder.com/300",
        category: "Electronics",
        stock: 10,
        rating: 4.7
    },
    {
        id: 4,
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and SD card reader",
        price: 39.99,
        image: "https://via.placeholder.com/300",
        category: "Accessories",
        stock: 25,
        rating: 4.3
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 29.99,
        image: "https://via.placeholder.com/300",
        category: "Electronics",
        stock: 30,
        rating: 4.6
    },
    {
        id: 6,
        name: "Monitor Light Bar",
        description: "LED monitor light bar for reduced eye strain",
        price: 59.99,
        image: "https://via.placeholder.com/300",
        category: "Accessories",
        stock: 18,
        rating: 4.4
    },
    {
        id: 7,
        name: "Webcam HD",
        description: "1080p HD webcam with built-in microphone",
        price: 89.99,
        image: "https://via.placeholder.com/300",
        category: "Electronics",
        stock: 12,
        rating: 4.5
    },
    {
        id: 8,
        name: "Desk Mat",
        description: "Large gaming desk mat with smooth surface",
        price: 24.99,
        image: "https://via.placeholder.com/300",
        category: "Accessories",
        stock: 40,
        rating: 4.2
    }
];

export const mockCategories = ["Electronics", "Accessories", "Audio", "Video", "Gaming"];

export const mockCart = {
    items: [],
    total: 0
};

export const mockOrders = [];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockFetchProducts = async ({ search = '', category = '', page = 1, limit = 12 } = {}) => {
    await delay(500);
    
    let filtered = mockProducts;
    
    if (search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);
    
    return {
        data: paginated,
        pagination: {
            page,
            limit,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / limit)
        }
    };
};

export const mockFetchProductById = async (id) => {
    await delay(300);
    const product = mockProducts.find(p => p.id === parseInt(id));
    return { data: product };
};

export const mockFetchCategories = async () => {
    await delay(200);
    return { data: mockCategories };
};

export const mockFetchCart = async () => {
    await delay(300);
    return { data: mockCart };
};

export const mockAddToCart = async ({ productId, quantity = 1 }) => {
    await delay(400);
    const product = mockProducts.find(p => p.id === productId);
    if (!product) throw new Error('Product not found');
    
    const existingIndex = mockCart.items.findIndex(item => item.productId === productId);
    if (existingIndex >= 0) {
        mockCart.items[existingIndex].quantity += quantity;
    } else {
        mockCart.items.push({
            id: Date.now(),
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }
    
    mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { data: mockCart };
};

export const mockUpdateCartItem = async ({ itemId, quantity }) => {
    await delay(300);
    const item = mockCart.items.find(item => item.id === itemId);
    if (item) {
        item.quantity = quantity;
        mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    return { data: mockCart };
};

export const mockRemoveFromCart = async (itemId) => {
    await delay(300);
    mockCart.items = mockCart.items.filter(item => item.id !== itemId);
    mockCart.total = mockCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { data: mockCart };
};

export const mockClearCart = async () => {
    await delay(200);
    mockCart.items = [];
    mockCart.total = 0;
    return { data: mockCart };
};

export const mockPlaceOrder = async (orderData) => {
    await delay(800);
    const order = {
        id: Date.now(),
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    mockOrders.push(order);
    mockCart.items = [];
    mockCart.total = 0;
    return { data: order };
};

export const mockFetchOrders = async () => {
    await delay(500);
    return { data: mockOrders };
};

export const mockFetchOrderById = async (id) => {
    await delay(300);
    const order = mockOrders.find(o => o.id === parseInt(id));
    return { data: order };
};