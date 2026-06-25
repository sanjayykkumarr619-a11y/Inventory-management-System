function LowStockTable({ items }) {
  return (
    <div className="table-wrapper">
      <table className="table-modern">
        <thead>
          <tr>
            <th>Product</th>
            <th>Stock</th>
            <th>Threshold</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.productId?.name}</td>
              <td>
                <span className="badge badge-danger">
                  {item.currentStock}
                </span>
              </td>
              <td>{item.lowStockThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && (
        <div className="table-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>All stock levels are healthy</p>
        </div>
      )}
    </div>
  );
}

export default LowStockTable;