const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // No mostrar si solo hay una página

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        <button
          className="join-item btn"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          «
        </button>

        <button className="join-item btn btn-ghost no-click">
          Página {page} / {totalPages}
        </button>

        <button
          className="join-item btn"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;