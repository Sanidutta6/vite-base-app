import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const TablePagination = ({
    current_page,
    total_pages,
    onPageChange
}: {
    current_page: number,
    total_pages: number,
    onPageChange: (page: number) => void
}) => {
    // Generate array of page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (total_pages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= total_pages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end of middle section
            let start = Math.max(2, current_page - 1);
            let end = Math.min(total_pages - 1, current_page + 1);

            // Add ellipsis after first page if needed
            if (start > 2) {
                pages.push('ellipsis-start');
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis before last page if needed
            if (end < total_pages - 1) {
                pages.push('ellipsis-end');
            }

            // Always show last page
            pages.push(total_pages);
        }

        return pages;
    };

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= total_pages) {
            onPageChange(page);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(current_page - 1);
                        }}
                        aria-disabled={current_page === 1}
                        className={current_page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>

                {pageNumbers.map((page) => {
                    if (typeof page === 'string') {
                        return (
                            <PaginationItem key={page}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageClick(page);
                                }}
                                isActive={current_page === page}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageClick(current_page + 1);
                        }}
                        aria-disabled={current_page === total_pages}
                        className={current_page === total_pages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default TablePagination;