# ShopHub - E-Commerce Web Client

A modern, fully-functional e-commerce web application built with React 19, Tailwind CSS, Axios, and TanStack Query. This application consumes the live E-Comus API to provide a complete shopping experience including product browsing, cart management, and order checkout.

## Features

### Product Catalog

- Browse products with responsive grid layout (1-4 columns)
- Search products by name/description
- Filter by category
- Pagination with smart page number display
- Product detail pages with full information
- Loading skeletons for better UX
- Error states with retry functionality
- Empty states with helpful messages

### Shopping Cart

- Add products to cart with toast notifications
- Update item quantities (+/- buttons)
- Remove items from cart
- Real-time cart total calculation
- Cart badge in header showing item count
- Cart persists across page refreshes (server-backed)
- Cart summary with subtotal and total

### Checkout & Orders

- Complete checkout flow with shipping and payment forms
- Form validation using React Hook Form
- Order confirmation with success message
- Order history page with status indicators
- Order detail page with full information
- Clickable order cards to view details

### UI/UX

- Fully responsive design (mobile, tablet, desktop)
- Consistent design system with reusable components
- Skeleton loaders for all data fetching
- Toast notifications for user feedback
- Error handling with user-friendly messages
- Smooth transitions and hover effects
- Accessible forms with proper labels

## Tech Stack

- **React 19** - UI library with function components and hooks
- **React Router DOM 7** - Client-side routing and navigation
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API requests with centralized configuration
- **TanStack Query (React Query) 5** - Server state management, caching, and synchronization
- **React Hook Form** - Form handling and validation
- **Sonner** - Toast notifications
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Project Structure

```text
src/
├── api/                          # API layer
│   ├── client.js                # Axios instance with interceptors
│   ├── products.js              # Product API functions
│   ├── cart.js                  # Cart API functions
│   └── orders.js                # Order API functions
├── components/                  # Reusable UI components
│   ├── Button.jsx               # Button component with variants
│   ├── Input.jsx                # Form input component
│   ├── Card.jsx                 # Card container component
│   ├── ProductCard.jsx          # Product display card
│   ├── CartItem.jsx             # Cart item component
│   ├── SearchBar.jsx            # Search input with icon
│   ├── Pagination.jsx           # Smart pagination component
│   ├── Loader.jsx               # Loading spinner
│   ├── Skeleton.jsx             # Skeleton loaders
│   ├── ErrorMessage.jsx         # Error display component
│   ├── EmptyState.jsx           # Empty state component
│   ├── Modal.jsx                # Modal dialog
│   ├── Badge.jsx                # Status badge
│   ├── QuantitySelector.jsx     # Quantity input with +/- buttons
│   ├── Toast.jsx                # Toast notification provider
│   └── Header.jsx               # App header with navigation
├── context/                     # React Context for global state
│   └── CartContext.jsx          # Cart state management
├── pages/                       # Page components
│   ├── HomePage.jsx             # Product listing with search/filter
│   ├── ProductDetailPage.jsx    # Single product view
│   ├── CartPage.jsx             # Shopping cart
│   ├── CheckoutPage.jsx         # Checkout form
│   ├── OrdersPage.jsx           # Order history
│   ├── OrderDetailPage.jsx      # Single order view
│   └── NotFoundPage.jsx         # 404 page
├── App.jsx                      # Main app with routing
└── main.jsx                     # Entry point with providers
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

3. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://e-comus-api.vercel.app
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Build for Production

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
- Examples: `['products', { search, category, page }]`, `['cart']`, `['orders']`
- Mutations use `useMutation` with proper cache invalidation
- No duplication of server data in component state

**UI State (React)**

- Search input values, form data, and UI toggles use `useState`
- Cart operations use Context API for global access and convenience methods
- Form validation uses React Hook Form
- No API data stored in local state

### API Layer

- **Centralized Axios instance** in `src/api/client.js`
- Request interceptor adds auth token from localStorage
- Response interceptor handles 401 errors
- All API calls go through this single instance
- Environment variable for base URL (never hardcoded)

### Component Design

- **Reusable, composable components** with props-based customization
- **Consistent styling** with Tailwind utility classes
- **Variants and sizes** for flexibility (Button, Badge)
- **Accessible forms** with proper labels and error messages
- **Loading and error states** for all async operations

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
    queryClient.invalidateQueries({ queryKey: ['orders'] });
    navigate('/orders');
  },
});

```

### Cart State Management

The cart uses a hybrid approach:

- **Server state**: Cart data fetched from API and cached in TanStack Query
- **Local state**: CartContext provides convenient methods and derived values (total, count)
- **Persistence**: Cart survives page refresh via API
- **Cache invalidation**: Properly invalidates cart queries after mutations

### Form Handling with React Hook Form

```javascript
const { register, handleSubmit, formState: { errors } } = useForm();

<Input
  label="Email"
  type="email"
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email is invalid',
    },
  })}
  error={errors.email?.message}
/>
```

### Toast Notifications

Using Sonner for user feedback:

```javascript
import { toast } from 'sonner';

toast.success('Product added to cart!');
toast.error('Failed to add product to cart');
```

## Design System

### Colors

- **Primary**: Blue (`blue-600`, `blue-700`)
- **Success**: Green (`green-100`, `green-800`)
- **Warning**: Yellow (`yellow-100`, `yellow-800`)
- **Error**: Red (`red-50`, `red-200`, `red-600`)
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Headings**: Bold, gray-900
- **Body**: Regular, gray-700
- **Prices**: Bold, blue-600

### Spacing

- Consistent padding using Tailwind's spacing scale
- Cards: `p-4` to `p-6`
- Page containers: `px-4 sm:px-6 lg:px-8`

### Components

- **Rounded corners**: `rounded-lg` or `rounded-xl`
- **Shadows**: `shadow-sm` for cards
- **Transitions**: `transition-colors`, `transition-shadow`
- **Hover effects**: Color changes and shadow enhancements

## Responsive Breakpoints

- **Mobile**: Default (1 column)
- **Tablet**: `sm:` (640px+) - 2 columns
- **Desktop**: `lg:` (1024px+) - 3 columns
- **Large Desktop**: `xl:` (1280px+) - 4 columns

## 🔌 API Documentation

This application uses the [E-Comus API](https://e-comus-api.vercel.app). Key endpoints:

### Products

- `GET /products` - List products with search, filter, pagination
- `GET /products/:id` - Get single product
- `GET /categories` - List all categories

### Cart

- `GET /cart` - Get cart contents
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/:id` - Update cart item quantity
- `DELETE /cart/items/:id` - Remove item from cart
- `DELETE /cart` - Clear cart

### Orders

- `POST /orders` - Place an order
- `GET /orders` - Get order history
- `GET /orders/:id` - Get single order

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable `VITE_API_BASE_URL`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Add environment variable `VITE_API_BASE_URL`
4. Build command: `npm run build`
5. Publish directory: `dist`

## Testing

The application includes:

- Loading states for all data fetching
- Error states with retry functionality
- Empty states for no data scenarios
- Form validation with error messages
- Responsive design testing
- Cart persistence testing
- Complete checkout flow testing

## Git Commit Messages

Follow conventional commits

- `feat: initialize project`
- `feat: configure axios client`
- `feat: integrate TanStack Query`
- `feat: build product listing`
- `feat: add product details`
- `feat: implement shopping cart`
- `feat: build checkout workflow`
- `feat: implement order history`
- `style: improve responsive layout`
- `fix: resolve cart quantity bug`
- `docs: update README`

## Learning Resources

### Why Feature-Based Architecture?

This project uses a feature-based folder structure because:

- **Scalability**: Easy to add new features without cluttering existing ones
- **Maintainability**: Related files are grouped together
- **Team collaboration**: Multiple developers can work on different features
- **Code organization**: Clear separation of concerns

### How Axios Works

Axios is configured with:

- **Base URL**: From environment variable
- **Request interceptor**: Adds auth token to headers
- **Response interceptor**: Handles 401 errors globally
- **Single instance**: All requests go through one configured client

### How TanStack Query Works

TanStack Query manages server state by:

- **Caching**: Stores API responses with configurable TTL
- **Background refetching**: Keeps data fresh
- **Deduplication**: Prevents duplicate requests
- **Cache invalidation**: Updates cache after mutations
- **DevTools**: Debugging and monitoring

### Difference Between Server State and UI State

**Server State** (TanStack Query):

- Data from API (products, orders, cart)
- Needs caching and synchronization
- Shared across components
- Managed by TanStack Query

**UI State** (React):

- Search input, form data, modal visibility
- Local to specific components
- No caching needed
- Managed by useState/useReducer/Context

### How Cache Invalidation Works

After mutations (add to cart, place order):

1. Perform the mutation
2. On success, invalidate related queries
3. TanStack Query automatically refetches the data
4. UI updates with fresh data

Example:

```javascript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['cart'] });
  queryClient.invalidateQueries({ queryKey: ['orders'] });
}
```

## 🐛 One Challenge Encountered

**Challenge**: Managing cart state across multiple components while keeping it in sync with the server.

**Solution**: Implemented a hybrid approach:

- CartContext for convenient global access and derived values (total, count)
- TanStack Query for caching and server synchronization
- Cache invalidation after every mutation to ensure data consistency
- Toast notifications for immediate user feedback

This approach provides the best of both worlds: easy access to cart data anywhere in the app, while maintaining server state as the single source of truth.

## License

This project is created for educational purposes.

## Author

Built as part of the SheCanCode e-commerce assignment.

## Acknowledgments

- [E-Comus API](https://e-comus-api.vercel.app) for providing the backend
- [TanStack Query](https://tanstack.com/query) for excellent state management
- [Tailwind CSS](https://tailwindcss.com) for rapid UI development