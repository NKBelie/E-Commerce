# ShopHub - E-Commerce Web Client

A modern, fully-functional e-commerce web application built with React, Tailwind CSS, Axios, and TanStack Query. This application consumes the live E-Comus API to provide a complete shopping experience including product browsing, cart management, and order checkout.

## Tech Stack

- **React 19** - UI library with function components and hooks
- **React Router** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API requests with centralized configuration
- **TanStack Query (React Query)** - Server state management, caching, and synchronization
- **Vite** - Build tool and development server

## Features

### Product Catalog

- Browse products with responsive grid layout
- Search products by name/description
- Filter by category
- Pagination support
- Product detail pages with full information
- Loading, error, and empty states

### Shopping Cart

- Add products to cart
- Update item quantities
- Remove items from cart
- Real-time cart total calculation
- Cart persists across page refreshes (server-backed)

### Checkout & Orders

- Complete checkout flow with shipping and payment forms
- Form validation with error messages
- Order confirmation
- Order history page with status indicators

### UI/UX

- Fully responsive design (mobile, tablet, desktop)
- Consistent design system with reusable components
- Loading spinners and skeleton states
- Error handling with user-friendly messages
- Smooth transitions and hover effects

## Project Structure

```text
src/
├── api/                    # API layer
│   ├── client.js          # Axios instance with interceptors
│   ├── products.js        # Product API functions
│   ├── cart.js            # Cart API functions
│   └── orders.js          # Order API functions
├── components/            # Reusable UI components
│   ├── Button.jsx         # Button component with variants
│   ├── Input.jsx          # Form input component
│   ├── Card.jsx           # Card container component
│   ├── ProductCard.jsx    # Product display card
│   └── Header.jsx         # App header with navigation
├── context/               # React Context for global state
│   └── CartContext.jsx    # Cart state management
├── pages/                 # Page components
│   ├── HomePage.jsx       # Product listing with search/filter
│   ├── ProductDetailPage.jsx  # Single product view
│   ├── CartPage.jsx       # Shopping cart
│   ├── CheckoutPage.jsx   # Checkout form
│   └── OrdersPage.jsx     # Order history
├── App.jsx                # Main app with routing
└── main.jsx               # Entry point with providers
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd e-commerce
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (already configured):

```env
VITE_API_BASE_URL=https://e-comus-api.vercel.app
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Architecture Decisions

### State Management

**Server State (TanStack Query)**

- All data from the API (products, cart, orders) is managed by TanStack Query
- Uses descriptive query keys for caching and invalidation
- Example: `['products', { search, category, page }]`
- Mutations use `useMutation` with cache invalidation

-**UI State (React)**

- Search input values, form data, and UI toggles use `useState`
- Cart operations use Context API for global access
- No duplication of server data in component state

### API Layer

- Centralized Axios instance in `src/api/client.js`
- Request interceptor adds auth token from localStorage
- Response interceptor handles 401 errors
- All API calls go through this single instance
- Environment variable for base URL

### Component Design

- Reusable, composable components
- Consistent styling with Tailwind utility classes
- Props-based customization (variants, sizes, states)
- Accessible forms with proper labels and error messages

## Key Implementation Details

### TanStack Query Usage

**Reading Data (useQuery):**

```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['products', { search, category, page }],
  queryFn: () => fetchProducts({ search, category, page }),
});
```

**Writing Data (useMutation):**

```javascript
const mutation = useMutation({
  mutationFn: placeOrder,
  onSuccess: () => {
    clearCart();
    navigate('/orders');
  },
});

```

### Cart State Management

The cart uses a hybrid approach:

- **Server state**: Cart data fetched from API and cached in TanStack Query
- **Local state**: CartContext provides convenient methods and derived values (total, count)
- **Persistence**: Cart survives page refresh via API

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Grid layouts adapt from 1 to 4 columns
- Sticky elements (header, order summary) for better UX
- Touch-friendly button and input sizes

## API Documentation

This application uses the [E-Comus API](https://e-comus-api.vercel.app). Key endpoints:

- `GET /products` - List products with search, filter, pagination
- `GET /products/:id` - Get single product
- `GET /categories` - List all categories
- `GET /cart` - Get cart contents
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item quantity
- `DELETE /cart/items/:id` - Remove item from cart
- `POST /orders` - Place an order
- `GET /orders` - Get order history

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Optimistic UI updates for cart mutations
- Debounced search input
- Skeleton loaders instead of spinners
- Dark mode toggle
- User authentication
- Product reviews and ratings
- Wishlist functionality

## License

This project is created for educational purposes.

## Author

Built as part of the SheCanCode e-commerce assignment.
