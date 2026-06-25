import { getTransactionTypeBadgeClass } from "../utils/badge";

function RecentTransactionsTable({ transactions }) {
  return (
    <div className="table-wrapper">
      <table className="table-modern">
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
              <td>
                <span className={getTransactionTypeBadgeClass(transaction.type)}>
                  {transaction.type}
                </span>
              </td>
              <td>{transaction.quantity}</td>
              <td>{transaction.reason}</td>
              <td>{transaction.performedBy?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="table-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <p>No recent transactions yet</p>
        </div>
      )}
    </div>
  );
}

export default RecentTransactionsTable;