import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import CategoryForm from "../components/CategoryForm";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductForm from "../components/ProductForm";
import VariantForm from "../components/VariantForm";
import VariantTable from "../components/VariantTable";
import { useToast } from "../components/toastContext";
import { exportCsv } from "../utils/csv";
import { getCategoryId, getProductId } from "../utils/relations";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || fallback;

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);
  const [activeProductFormCategoryId, setActiveProductFormCategoryId] = useState("");
  const [activeVariantFormProductId, setActiveVariantFormProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const { showToast } = useToast();

  const fetchAll = useCallback(async () => {
    setFetching(true);
    try {
      const [categoryResponse, productResponse, variantResponse] =
        await Promise.all([
          api.get("/categories"),
          api.get("/products"),
          api.get("/variants"),
        ]);

      setCategories(categoryResponse.data.data);
      setProducts(productResponse.data.data);
      setVariants(variantResponse.data.data);
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Unable to load management data"), "error");
    } finally {
      setFetching(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return categories;

    return categories.filter((category) => {
      const categoryProducts = products.filter(
        (product) => getCategoryId(product) === category._id
      );
      const productIds = new Set(categoryProducts.map((product) => product._id));
      const categoryVariants = variants.filter((variant) =>
        productIds.has(getProductId(variant))
      );

      return [
        category.name,
        ...categoryProducts.flatMap((product) => [product.name, product.brand]),
        ...categoryVariants.flatMap((variant) => [
          variant.sku,
          variant.color,
          variant.size,
        ]),
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [categories, products, variants, searchTerm]);

  const runMutation = async (action, successMessage) => {
    setSaving(true);
    try {
      await action();
      await fetchAll();
      showToast(successMessage);
    } catch (error) {
      console.error(error);
      showToast(getErrorMessage(error, "Action failed"), "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddCategory = (name) =>
    runMutation(
      () => api.post("/categories", { name }),
      "Category Created"
    );

  const handleUpdateCategory = (id, name) =>
    runMutation(async () => {
      await api.put(`/categories/${id}`, { name });
      setEditingCategory(null);
    }, "Category Updated");

  const handleAddProduct = (productData) =>
    runMutation(
      () => api.post("/products", productData),
      "Product Created"
    );

  const handleUpdateProduct = (id, productData) =>
    runMutation(async () => {
      await api.put(`/products/${id}`, productData);
      setEditingProduct(null);
    }, "Product Updated");

  const handleAddVariant = (variantData) =>
    runMutation(
      () => api.post("/variants", variantData),
      "Variant Created"
    );

  const handleUpdateVariant = (id, variantData) =>
    runMutation(async () => {
      await api.put(`/variants/${id}`, variantData);
      setEditingVariant(null);
    }, "Variant Updated");

  const requestDelete = (type, item) => {
    const label =
      type === "category" ? item.name : type === "product" ? item.name : item.sku;

    setConfirmState({
      type,
      item,
      title: `Delete ${type}`,
      message: `This will remove "${label}" from active inventory records.`,
    });
  };

  const confirmDelete = async () => {
    if (!confirmState) return;

    const { type, item } = confirmState;
    const endpoint =
      type === "category"
        ? `/categories/${item._id}`
        : type === "product"
          ? `/products/${item._id}`
          : `/variants/${item._id}`;
    const successMessage =
      type === "category"
        ? "Category Deleted"
        : type === "product"
          ? "Product Deleted"
          : "Variant Deleted";

    await runMutation(async () => {
      await api.delete(endpoint);
      setConfirmState(null);
    }, successMessage);
  };

  const handleExport = () => {
    exportCsv(
      "categories-products-variants.csv",
      [
        { label: "Record Type", value: (row) => row.recordType },
        { label: "Category", value: (row) => row.category },
        { label: "Product", value: (row) => row.product },
        { label: "Brand", value: (row) => row.brand },
        { label: "SKU", value: (row) => row.sku },
        { label: "Color", value: (row) => row.color },
        { label: "Size", value: (row) => row.size },
        { label: "Price", value: (row) => row.price },
        { label: "Stock", value: (row) => row.stock },
      ],
      categories.flatMap((category) => {
        const categoryProducts = products.filter(
          (product) => getCategoryId(product) === category._id
        );
        const categoryRows = [
          { recordType: "Category", category: category.name },
        ];

        return [
          ...categoryRows,
          ...categoryProducts.flatMap((product) => {
            const productVariants = variants.filter(
              (variant) => getProductId(variant) === product._id
            );

            return [
              {
                recordType: "Product",
                category: category.name,
                product: product.name,
                brand: product.brand,
              },
              ...productVariants.map((variant) => ({
                recordType: "Variant",
                category: category.name,
                product: product.name,
                brand: product.brand,
                sku: variant.sku,
                color: variant.color,
                size: variant.size,
                price: variant.price,
                stock: variant.currentStock,
              })),
            ];
          }),
        ];
      })
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Categories</h1>
          <p className="page-header__subtitle">
            Manage categories, products, and variants in one place.
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
          placeholder="Search categories, products, variants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="section">
        <CategoryForm
          onAdd={handleAddCategory}
          editingCategory={editingCategory}
          onUpdate={handleUpdateCategory}
          onCancel={() => setEditingCategory(null)}
          loading={saving}
        />
      </div>

      {fetching ? (
        <div className="card card--padded">
          <LoadingSpinner label="Loading categories" />
        </div>
      ) : (
        <div className="category-management-list">
          {filteredCategories.map((category) => {
            const categoryProducts = products.filter(
              (product) => getCategoryId(product) === category._id
            );

            return (
              <details key={category._id} className="management-card" open>
                <summary className="management-card__summary">
                  <div>
                    <h2>{category.name}</h2>
                    <p>
                      {categoryProducts.length} product
                      {categoryProducts.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="action-buttons">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={(event) => {
                        event.preventDefault();
                        setEditingCategory(category);
                      }}
                    >
                      Edit Category
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={(event) => {
                        event.preventDefault();
                        requestDelete("category", category);
                      }}
                    >
                      Delete Category
                    </button>
                  </div>
                </summary>

                <div className="management-card__body">
                  <section className="nested-section">
                    <div className="nested-section__header">
                      <div>
                        <h3>Products</h3>
                        <p className="nested-section__subtitle">
                          Add products here, then manage each product's variants below.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          setActiveProductFormCategoryId(
                            activeProductFormCategoryId === category._id
                              ? ""
                              : category._id
                          )
                        }
                      >
                        Add Product
                      </button>
                    </div>

                    {(activeProductFormCategoryId === category._id ||
                      getCategoryId(editingProduct) === category._id) && (
                      <div className="nested-form">
                        <ProductForm
                          onAdd={handleAddProduct}
                          onUpdate={handleUpdateProduct}
                          editingProduct={editingProduct}
                          categories={categories}
                          fixedCategoryId={category._id}
                          onCancel={() => {
                            setEditingProduct(null);
                            setActiveProductFormCategoryId("");
                          }}
                          loading={saving}
                        />
                      </div>
                    )}

                    {categoryProducts.length === 0 && (
                      <div className="table-empty-state nested-empty-state">
                        <p>No products in this category yet</p>
                      </div>
                    )}
                  </section>

                  {categoryProducts.map((product) => {
                    const productVariants = variants.filter(
                      (variant) => getProductId(variant) === product._id
                    );
                    const productEditingVariant =
                      getProductId(editingVariant) === product._id
                        ? editingVariant
                        : null;
                    const showVariantForm =
                      activeVariantFormProductId === product._id ||
                      Boolean(productEditingVariant);

                    return (
                      <section key={product._id} className="product-panel">
                        <div className="product-panel__summary">
                          <div>
                            <h3>{product.name}</h3>
                            <p>
                              {product.brand} - {productVariants.length} variant
                              {productVariants.length === 1 ? "" : "s"}
                            </p>
                          </div>
                          <div className="action-buttons">
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setEditingProduct(product);
                                setActiveProductFormCategoryId(category._id);
                              }}
                            >
                              Edit Product
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => requestDelete("product", product)}
                            >
                              Delete Product
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                setEditingVariant(null);
                                setActiveVariantFormProductId(
                                  activeVariantFormProductId === product._id
                                    ? ""
                                    : product._id
                                );
                              }}
                            >
                              Add Variant
                            </button>
                          </div>
                        </div>

                        <div className="product-panel__body">
                          {showVariantForm && (
                            <div className="nested-form">
                              <VariantForm
                                products={[product]}
                                editingVariant={productEditingVariant}
                                onAdd={handleAddVariant}
                                onUpdate={handleUpdateVariant}
                                fixedProductId={product._id}
                                onCancel={() => {
                                  setEditingVariant(null);
                                  setActiveVariantFormProductId("");
                                }}
                                loading={saving}
                              />
                            </div>
                          )}

                          <VariantTable
                            variants={productVariants}
                            onEdit={(variant) => {
                              setEditingVariant(variant);
                              setActiveVariantFormProductId(product._id);
                            }}
                            onDelete={(variant) => requestDelete("variant", variant)}
                            showProduct={false}
                          />
                        </div>
                      </section>
                    );
                  })}
                </div>
              </details>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="table-empty-state card">
              <p>No matching categories, products, or variants</p>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        open={Boolean(confirmState)}
        title={confirmState?.title}
        message={confirmState?.message}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmDelete}
        loading={saving}
      />
    </div>
  );
}

export default CategoriesPage;
