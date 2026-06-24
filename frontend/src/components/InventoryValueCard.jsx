function InventoryValueCard({ value }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Total Inventory Value</h2>
      <h1>₹ {value}</h1>
    </div>
  );
}

export default InventoryValueCard;