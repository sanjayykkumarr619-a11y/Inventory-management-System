import { useEffect, useState } from "react";

function CategoryForm({
  onAdd,
  editingCategory,
  onUpdate,
}) {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button type="submit">
        {editingCategory
          ? "Update Category"
          : "Add Category"}
      </button>
    </form>
  );
}

export default CategoryForm;