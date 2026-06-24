function TransactionTable({
  transactions,
}) {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Reason</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map(
          (transaction) => (
            <tr key={transaction._id}>
              <td>
                {
                  transaction
                    .variantId?.sku
                }
              </td>

              <td>
                {transaction.type}
              </td>

              <td>
                {
                  transaction.quantity
                }
              </td>

              <td>
                {transaction.reason}
              </td>

              <td>
                {new Date(
                  transaction.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default TransactionTable;