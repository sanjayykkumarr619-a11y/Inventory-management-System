import "./InventoryValueCard.css";

function InventoryValueCard({ value }) {
  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value ?? "0";

  return (
    <div className="card card--padded inventory-value-card">
      <div className="inventory-value-card__icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3h12M6 8h12M9 13h6m-9 8h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <p className="inventory-value-card__label">Total Inventory Value</p>
        <h1 className="inventory-value-card__value">₹ {displayValue}</h1>
      </div>
    </div>
  );
}

export default InventoryValueCard;