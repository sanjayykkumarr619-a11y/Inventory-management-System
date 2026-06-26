import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductTable from "../components/ProductTable";
import { useToast } from "../components/toastContext";
import { exportCsv } from "../utils/csv";
import { getCategoryId } from "../utils/relations";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          api.get("/products"),
          api.get("/categories"),
        ]);

        setProducts(productResponse.data.data);
        setCategories(categoryResponse.data.data);
      } catch (error) {
        console.error(error);
        showToast("Unable to load products", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products;

    return products.filter((product) =>
      [product.name, product.brand, product.categoryId?.name]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [products, searchTerm]);

  const handleExport = () => {
    exportCsv(
      "products.csv",
      [
        { label: "Category", value: (product) => product.categoryId?.name },
        { label: "Product", value: (product) => product.name },
        { label: "Brand", value: (product) => product.brand },
        { label: "Created At", value: (product) => product.createdAt },
      ],
      filteredProducts
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Products</h1>
          <p className="page-header__subtitle">
            View products grouped under their categories.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      <div className="toolbar section">
        <input
          className="form-input toolbar__search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="card card--padded">
          <LoadingSpinner label="Loading products" />
        </div>
      ) : (
        <div className="grouped-list">
          {categories.map((category) => {
            const categoryProducts = filteredProducts.filter(
              (product) => getCategoryId(product) === category._id
            );

            if (categoryProducts.length === 0) return null;

            return (
              <section key={category._id} className="table-card">
                <div className="table-card__header">
                  <h2 className="table-card__title">{category.name}</h2>
                  <span className="badge badge-neutral">
                    {categoryProducts.length} products
                  </span>
                </div>
                <ProductTable products={categoryProducts} showCategory={false} />
              </section>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="table-empty-state card">
              <p>No matching products</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
