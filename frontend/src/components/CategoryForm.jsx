import { useEffect, useState } from "react";

function CategoryForm({ onAdd, editingCategory, onUpdate, onCancel, loading }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingCategory) {
      onUpdate(editingCategory._id, name.trim());
    } else {
      onAdd(name.trim());
    }

    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="form-group">
        <label htmlFor="category-name" className="form-label">
          Category Name
        </label>
        <input
          id="category-name"
          type="text"
          placeholder="e.g. Footwear"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-actions">
        {editingCategory && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? "Saving..."
            : editingCategory
              ? "Update Category"
              : "Add Category"}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
