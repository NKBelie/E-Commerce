import Button from './Button';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
}) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    return (
        <div className={`flex justify-center items-center space-x-2 ${className}`}>
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>
            
            {getPageNumbers().map((page, index) => (
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={currentPage === page ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                )
            ))}
            
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}