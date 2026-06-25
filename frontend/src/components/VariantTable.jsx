function VariantTable({ variants, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="table-modern">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id}>
              <td>{variant.sku}</td>

              <td>{variant.productId?.name}</td>

              <td>{variant.color}</td>

              <td>{variant.size}</td>

              <td>₹ {variant.price}</td>

              <td>
                <span className="badge badge-primary">
                  {variant.currentStock}
                </span>
              </td>

              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => onEdit(variant)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Delete "${variant.sku}"?`
                      );

                      if (confirmed) {
                        onDelete(variant._id);
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

      {variants.length === 0 && (
        <div className="table-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p>No variants yet</p>
        </div>
      )}
    </div>
  );
}

export default VariantTable;