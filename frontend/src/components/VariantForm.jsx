import {
  useState,
  useEffect,
} from "react";

function VariantForm({
  products,
  editingVariant,
  onAdd,
  onUpdate,
}) {
  const [productId, setProductId] =
    useState("");

  const [sku, setSku] =
    useState("");

  const [color, setColor] =
    useState("");

  const [size, setSize] =
    useState("M");

  const [price, setPrice] =
    useState("");

  const [
    currentStock,
    setCurrentStock,
  ] = useState("");

  useEffect(() => {
    if (editingVariant) {
      setProductId(
        editingVariant.productId?._id ||
          editingVariant.productId
      );

      setSku(editingVariant.sku);
      setColor(editingVariant.color);
      setSize(editingVariant.size);
      setPrice(editingVariant.price);
      setCurrentStock(
        editingVariant.currentStock
      );
    }
  }, [editingVariant]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const variantData = {
      productId,
      sku,
      color,
      size,
      price: Number(price),
      currentStock:
        Number(currentStock),
      lowStockThreshold: 5,
    };

    if (editingVariant) {
      onUpdate(
        editingVariant._id,
        variantData
      );
    } else {
      onAdd(variantData);
    }

    setProductId("");
    setSku("");
    setColor("");
    setSize("M");
    setPrice("");
    setCurrentStock("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={productId}
        onChange={(e) =>
          setProductId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Product
        </option>

        {products.map((product) => (
          <option
            key={product._id}
            value={product._id}
          >
            {product.name}
          </option>
        ))}
      </select>

      <input
        placeholder="SKU"
        value={sku}
        onChange={(e) =>
          setSku(e.target.value)
        }
      />

      <input
        placeholder="Color"
        value={color}
        onChange={(e) =>
          setColor(e.target.value)
        }
      />

      <select
        value={size}
        onChange={(e) =>
          setSize(e.target.value)
        }
      >
        <option>XS</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
        <option>XXL</option>
      </select>

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Stock"
        value={currentStock}
        onChange={(e) =>
          setCurrentStock(
            e.target.value
          )
        }
      />

      <button type="submit">
        {editingVariant
          ? "Update Variant"
          : "Add Variant"}
      </button>
    </form>
  );
}

export default VariantForm; 