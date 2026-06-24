import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] =
    useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        "/products"
      );

      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/categories"
      );

      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleAddProduct = async (
    productData
  ) => {
    try {
      await api.post(
        "/products",
        productData
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (
    id,
    productData
  ) => {
    try {
      await api.put(
        `/products/${id}`,
        productData
      );

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (
    id
  ) => {
    try {
      await api.delete(
        `/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <ProductForm
        onAdd={handleAddProduct}
        onUpdate={
          handleUpdateProduct
        }
        editingProduct={
          editingProduct
        }
        categories={categories}
      />

      <br />

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={
          handleDeleteProduct
        }
      />
    </div>
  );
}

export default ProductsPage;