import { useState } from "react";

function StockInForm({ variants, onSubmit, loading }) {
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!variantId || Number(quantity) <= 0) return;

    onSubmit({
      variantId,
      quantity: Number(quantity),
      notes,
    });

    setVariantId("");
    setQuantity("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3 className="section-title">Stock In</h3>

      <div className="form-group">
        <label htmlFor="stockin-variant" className="form-label">
          Variant
        </label>
        <select
          id="stockin-variant"
          className="form-select"
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
        >
          <option value="">Select Variant</option>

          {variants.map((variant) => (
            <option key={variant._id} value={variant._id}>
              {variant.sku}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="stockin-quantity" className="form-label">
          Quantity
        </label>
        <input
          id="stockin-quantity"
          type="number"
          className="form-input"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stockin-notes" className="form-label">
          Notes
        </label>
        <input
          id="stockin-notes"
          className="form-input"
          placeholder="e.g. Restock from supplier"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Stock"}
        </button>
      </div>
    </form>
  );
}

export default StockInForm;
