function LowStockTable({ items }) {
  return (
    <div>
      <h2>Low Stock Items</h2>

      <table border="1" cellPadding="10">
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
              <td>{item.currentStock}</td>
              <td>{item.lowStockThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockTable;