import { useEffect, useState } from "react";
import api from "../api/axios";
import CategoryTable from "../components/CategoryTable";
import CategoryForm from "../components/CategoryForm";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (name) => {
    try {
      await api.post("/categories", {
        name,
      });

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      await api.put(`/categories/${id}`, {
        name,
      });

      setEditingCategory(null);

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/categories/${id}`);

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Categories</h1>
          <p className="page-header__subtitle">
            Organize your products into categories.
          </p>
        </div>
      </div>

      <div className="section">
        <CategoryForm
          onAdd={handleAddCategory}
          editingCategory={editingCategory}
          onUpdate={handleUpdateCategory}
        />
      </div>

      <CategoryTable
        categories={categories}
        onEdit={setEditingCategory}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}

export default CategoriesPage;