interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }: PaginationProps) => {
    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {
                [...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)} disabled={currentPage === index + 1}>
                        {index + 1}
                    </button>
                ))
            }

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>    

            <br />
            <label>
                Results per page:
                <select value={pageSize} onChange={(p) => onPageSizeChange(Number(p.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
            <br />
        </div>
    );
}

export default Pagination;