import { useState, useEffect } from "react";

function VariantForm({
  products,
  editingVariant,
  onAdd,
  onUpdate,
  fixedProductId,
  onCancel,
  loading,
}) {
  const [productId, setProductId] = useState(fixedProductId || "");
  const [sku, setSku] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("M");
  const [price, setPrice] = useState("");
  const [currentStock, setCurrentStock] = useState("");

  useEffect(() => {
    if (editingVariant) {
      setProductId(editingVariant.productId?._id || editingVariant.productId);
      setSku(editingVariant.sku);
      setColor(editingVariant.color);
      setSize(editingVariant.size);
      setPrice(editingVariant.price);
      setCurrentStock(editingVariant.currentStock);
    } else if (fixedProductId) {
      setProductId(fixedProductId);
    }
  }, [editingVariant, fixedProductId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const variantData = {
      productId: fixedProductId || productId,
      sku: sku.trim(),
      color: color.trim(),
      size,
      price: Number(price),
      currentStock: Number(currentStock),
      lowStockThreshold: 5,
    };

    if (!variantData.productId || !variantData.sku || !variantData.color) {
      return;
    }

    if (editingVariant) {
      onUpdate(editingVariant._id, variantData);
    } else {
      onAdd(variantData);
    }

    setProductId(fixedProductId || "");
    setSku("");
    setColor("");
    setSize("M");
    setPrice("");
    setCurrentStock("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        {!fixedProductId && (
          <div className="form-group form-group--full">
            <label htmlFor="variant-product" className="form-label">
              Product
            </label>
            <select
              id="variant-product"
              className="form-select"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="variant-sku" className="form-label">
            SKU
          </label>
          <input
            id="variant-sku"
            className="form-input"
            placeholder="e.g. SNK-BLK-M"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="variant-color" className="form-label">
            Color
          </label>
          <input
            id="variant-color"
            className="form-input"
            placeholder="e.g. Black"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="variant-size" className="form-label">
            Size
          </label>
          <select
            id="variant-size"
            className="form-select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="variant-price" className="form-label">
            Price
          </label>
          <input
            id="variant-price"
            type="number"
            className="form-input"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="variant-stock" className="form-label">
            Stock
          </label>
          <input
            id="variant-stock"
            type="number"
            className="form-input"
            placeholder="0"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        {editingVariant && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Saving..."
            : editingVariant
              ? "Update Variant"
              : "Add Variant"}
        </button>
      </div>
    </form>
  );
}

export default VariantForm;
