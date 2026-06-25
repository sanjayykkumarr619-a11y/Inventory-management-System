function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="table-modern">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.brand}</td>

              <td>{product.categoryId?.name}</td>

              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Delete "${product.name}"?`
                      );

                      if (confirmed) {
                        onDelete(product._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="table-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 8 12 3 3 8m18 0-9 5-9-5m18 0v8l-9 5-9-5V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <p>No products yet</p>
        </div>
      )}
    </div>
  );
}

export default ProductTable;