import {
  useState,
  useEffect,
} from "react";

function ProductForm({
  onAdd,
  onUpdate,
  editingProduct,
  categories,
}) {
  const [name, setName] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setBrand(editingProduct.brand);
      setCategoryId(
        editingProduct.categoryId?._id ||
          editingProduct.categoryId
      );
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      brand,
      categoryId,
    };

    if (editingProduct) {
      onUpdate(
        editingProduct._id,
        productData
      );
    } else {
      onAdd(productData);
    }

    setName("");
    setBrand("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Brand"
        value={brand}
        onChange={(e) =>
          setBrand(e.target.value)
        }
      />

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit">
        {editingProduct
          ? "Update Product"
          : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;