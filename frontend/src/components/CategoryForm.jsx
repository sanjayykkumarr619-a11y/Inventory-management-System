import { useEffect, useState } from "react";

function CategoryForm({ onAdd, editingCategory, onUpdate }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCategory) {
      onUpdate(editingCategory._id, name);
    } else {
      onAdd(name);
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
        <button type="submit" className="btn btn-primary">
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;