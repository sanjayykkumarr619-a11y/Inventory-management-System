import { useEffect, useState } from "react";
import api from "../api/axios";
import VariantTable from "../components/VariantTable";
import VariantForm from "../components/VariantForm";

function VariantsPage() {
  const [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingVariant, setEditingVariant] = useState(null);

  const fetchVariants = async () => {
    try {
      const response = await api.get("/variants");

      setVariants(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchProducts();
  }, []);

  const handleAddVariant = async (variantData) => {
    try {
      await api.post("/variants", variantData);

      fetchVariants();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateVariant = async (id, variantData) => {
    try {
      await api.put(`/variants/${id}`, variantData);

      setEditingVariant(null);

      fetchVariants();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVariant = async (id) => {
    try {
      await api.delete(`/variants/${id}`);

      fetchVariants();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Variants</h1>
          <p className="page-header__subtitle">
            Manage SKUs, pricing, and stock per product variant.
          </p>
        </div>
      </div>

      <div className="section">
        <VariantForm
          products={products}
          editingVariant={editingVariant}
          onAdd={handleAddVariant}
          onUpdate={handleUpdateVariant}
        />
      </div>

      <VariantTable
        variants={variants}
        onEdit={setEditingVariant}
        onDelete={handleDeleteVariant}
      />
    </div>
  );
}

export default VariantsPage;