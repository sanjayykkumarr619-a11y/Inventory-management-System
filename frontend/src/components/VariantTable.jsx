function VariantTable({ variants, onEdit, onDelete, showProduct = true }) {
  const showActions = Boolean(onEdit || onDelete);

  return (
    <div className="table-wrapper">
      <table className="table-modern">
        <thead>
          <tr>
            <th>SKU</th>
            {showProduct && <th>Product</th>}
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Stock</th>
            {showActions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id}>
              <td>{variant.sku}</td>

              {showProduct && <td>{variant.productId?.name}</td>}

              <td>{variant.color}</td>

              <td>{variant.size}</td>

              <td>Rs. {variant.price}</td>

              <td>
                <span className="badge badge-primary">
                  {variant.currentStock}
                </span>
              </td>

              {showActions && (
                <td>
                  <div className="action-buttons">
                    {onEdit && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onEdit(variant)}
                      >
                        Edit
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(variant)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
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
