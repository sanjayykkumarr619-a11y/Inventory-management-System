import { useState } from "react";

function StockOutForm({ variants, onSubmit }) {
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <h3 className="section-title">Stock Out</h3>

      <div className="form-group">
        <label htmlFor="stockout-variant" className="form-label">
          Variant
        </label>
        <select
          id="stockout-variant"
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
        <label htmlFor="stockout-quantity" className="form-label">
          Quantity
        </label>
        <input
          id="stockout-quantity"
          type="number"
          className="form-input"
          placeholder="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stockout-notes" className="form-label">
          Notes
        </label>
        <input
          id="stockout-notes"
          className="form-input"
          placeholder="e.g. Sold to customer"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-danger">
          Remove Stock
        </button>
      </div>
    </form>
  );
}

export default StockOutForm;