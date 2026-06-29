export default function QuantitySelector({
    value = 1,
    onChange,
    min = 1,
    max = 99,
    size = 'md',
    disabled = false,
}) {
    const handleDecrease = () => {
        if (value > min) {
            onChange?.(value - 1);
        }
    };

    const handleIncrease = () => {
        if (value < max) {
            onChange?.(value + 1);
        }
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            onChange?.(newValue);
        }
    };

    const sizes = {
        sm: 'w-6 h-6 text-sm',
        md: 'w-8 h-8 text-base',
        lg: 'w-10 h-10 text-lg',
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleDecrease}
                disabled={disabled || value <= min}
                className={`${sizes[size]} flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Decrease quantity"
            >
                <span className="text-gray-600">−</span>
            </button>
            <input
                type="number"
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
                disabled={disabled}
                className={`${sizes[size]} text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            <button
                onClick={handleIncrease}
                disabled={disabled || value >= max}
                className={`${sizes[size]} flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Increase quantity"
            >
                <span className="text-gray-600">+</span>
            </button>
        </div>
    );
}