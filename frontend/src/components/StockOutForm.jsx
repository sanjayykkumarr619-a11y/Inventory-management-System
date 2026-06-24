import { useState } from "react";

function StockOutForm({
  variants,
  onSubmit,
}) {
  const [variantId, setVariantId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [notes, setNotes] =
    useState("");

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
    <form onSubmit={handleSubmit}>
      <h3>Stock Out</h3>

      <select
        value={variantId}
        onChange={(e) =>
          setVariantId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Variant
        </option>

        {variants.map(
          (variant) => (
            <option
              key={variant._id}
              value={variant._id}
            >
              {variant.sku}
            </option>
          )
        )}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value
          )
        }
      />

      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(
            e.target.value
          )
        }
      />

      <button type="submit">
        Remove Stock
      </button>
    </form>
  );
}

export default StockOutForm;