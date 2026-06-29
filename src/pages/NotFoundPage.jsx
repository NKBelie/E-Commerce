import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="p-8 text-center max-w-md w-full">
                <svg
                    className="mx-auto h-24 w-24 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h1 className="mt-4 text-4xl font-bold text-gray-900">404</h1>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                    Page Not Found
                </h2>
                <p className="mt-4 text-gray-600">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            Go to Home
                        </Button>
                    </Link>
                    <Link to="/products">
                        <Button variant="outline" size="lg">
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}