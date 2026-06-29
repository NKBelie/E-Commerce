import Button from './Button';

export default function ErrorMessage({
    title = 'Something went wrong',
    message = 'An error occurred. Please try again later.',
    onRetry,
    className = '',
}) {
    return (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
            <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
            {onRetry && (
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onRetry}
                    className="mt-4"
                >
                    Try Again
                </Button>
            )}
        </div>
    );
}