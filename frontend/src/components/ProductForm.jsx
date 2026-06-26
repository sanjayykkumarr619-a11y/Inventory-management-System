import { useState, useEffect } from "react";

function ProductForm({
  onAdd,
  onUpdate,
  editingProduct,
  categories,
  fixedCategoryId,
  onCancel,
  loading,
}) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setBrand(editingProduct.brand);
      setCategoryId(
        editingProduct.categoryId?._id || editingProduct.categoryId
      );
    } else if (fixedCategoryId) {
      setCategoryId(fixedCategoryId);
    }
  }, [editingProduct, fixedCategoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: name.trim(),
      brand: brand.trim(),
      categoryId: fixedCategoryId || categoryId,
    };

    if (!productData.name.trim() || !productData.brand.trim() || !productData.categoryId) return;

    if (editingProduct) {
      onUpdate(editingProduct._id, productData);
    } else {
      onAdd(productData);
    }

    setName("");
    setBrand("");
    setCategoryId(fixedCategoryId || "");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="product-name" className="form-label">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="e.g. Classic Sneaker"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-brand" className="form-label">
            Brand
          </label>
          <input
            id="product-brand"
            type="text"
            placeholder="e.g. Nova"
            className="form-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        {!fixedCategoryId && (
          <div className="form-group form-group--full">
            <label htmlFor="product-category" className="form-label">
              Category
            </label>
            <select
              id="product-category"
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="form-actions">
        {editingProduct && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Saving..."
            : editingProduct
              ? "Update Product"
              : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
