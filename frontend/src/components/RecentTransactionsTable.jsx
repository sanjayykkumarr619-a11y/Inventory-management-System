function RecentTransactionsTable({ transactions }) {
  return (
    <div>
      <h2>Recent Transactions</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Reason</th>
            <th>Admin</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.variantId?.sku}</td>
              <td>{transaction.type}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.reason}</td>
              <td>{transaction.performedBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactionsTable;