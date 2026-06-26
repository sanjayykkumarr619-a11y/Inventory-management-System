import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { exportCsv } from "../utils/csv";
import "./CurrentStockPage.css";

/* ── Stock-status helpers ─────────────────────────────────────────────────── */

function getStockStatus(currentStock, lowStockThreshold) {
  if (currentStock === 0) return "out";
  if (currentStock <= lowStockThreshold) return "low";
  return "in";
}

function StockBadge({ currentStock, lowStockThreshold }) {
  const status = getStockStatus(currentStock, lowStockThreshold);
  if (status === "out")
    return <span className="badge badge-danger">🔴 Out of Stock</span>;
  if (status === "low")
    return <span className="badge badge-warning">🟡 Low Stock</span>;
  return <span className="badge badge-success">🟢 In Stock</span>;
}

/* ── Summary strip ────────────────────────────────────────────────────────── */

function SummaryStrip({ totalUnits, categoryCount, productCount, variantCount }) {
  const items = [
    { label: "Total Units", value: totalUnits.toLocaleString() },
    { label: "Categories", value: categoryCount },
    { label: "Products", value: productCount },
    { label: "Variants", value: variantCount },
  ];
  return (
    <div className="cs-summary">
      {items.map((item) => (
        <div key={item.label} className="cs-summary-card">
          <span className="cs-summary-card__label">{item.label}</span>
          <span className="cs-summary-card__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Variant table for one product ──────────────────────────────────────────  */

function VariantRows({ variants }) {
  return (
    <div className="cs-variant-table">
      <table className="table-modern">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Color</th>
            <th>Size</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v._id}>
              <td>{v.sku}</td>
              <td>{v.color}</td>
              <td>{v.size}</td>
              <td>
                <strong>{v.currentStock}</strong>
              </td>
              <td>₹{v.price?.toLocaleString()}</td>
              <td>
                <StockBadge
                  currentStock={v.currentStock}
                  lowStockThreshold={v.lowStockThreshold}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */

function CurrentStockPage() {
  const [variants, setVariants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  /* ── Fetch ──────────────────────────────────────────────────────────────── */

  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const [varRes, catRes, prodRes] = await Promise.all([
        api.get("/variants"),
        api.get("/categories"),
        api.get("/products"),
      ]);
      setVariants(varRes.data.data);
      setCategories(catRes.data.data);
      setProducts(prodRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Derived helpers ────────────────────────────────────────────────────── */

  // Build quick lookup maps
  const productMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p._id, p])),
    [products]
  );
  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c._id, c])),
    [categories]
  );

  // Enrich each variant with product + category info
  const enrichedVariants = useMemo(
    () =>
      variants.map((v) => {
        const product = productMap[
          typeof v.productId === "object" ? v.productId?._id : v.productId
        ] || v.productId;
        const categoryId =
          typeof product?.categoryId === "object"
            ? product?.categoryId?._id
            : product?.categoryId;
        const category = categoryMap[categoryId] || product?.categoryId;
        return {
          ...v,
          _product: product,
          _productName: product?.name || "Unknown",
          _categoryId: categoryId || "",
          _categoryName: category?.name || "Uncategorised",
          _status: getStockStatus(v.currentStock, v.lowStockThreshold),
        };
      }),
    [variants, productMap, categoryMap]
  );

  /* ── Filtering + sorting ────────────────────────────────────────────────── */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enrichedVariants.filter((v) => {
      // Category filter
      if (categoryFilter !== "all" && v._categoryId !== categoryFilter) return false;
      // Status filter
      if (statusFilter !== "all" && v._status !== statusFilter) return false;
      // Search
      if (q) {
        const haystack = [
          v._categoryName,
          v._productName,
          v.sku,
          v.color,
          v.size,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [enrichedVariants, categoryFilter, statusFilter, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "highest":
        return arr.sort((a, b) => b.currentStock - a.currentStock);
      case "lowest":
        return arr.sort((a, b) => a.currentStock - b.currentStock);
      case "newest":
        return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default: // name
        return arr.sort((a, b) =>
          a._productName.localeCompare(b._productName)
        );
    }
  }, [filtered, sortBy]);

  /* ── Group by category ──────────────────────────────────────────────────── */

  const grouped = useMemo(() => {
    const map = new Map();
    sorted.forEach((v) => {
      const key = v._categoryId || "uncategorised";
      if (!map.has(key)) {
        map.set(key, { categoryName: v._categoryName, products: new Map() });
      }
      const catGroup = map.get(key);
      const productKey =
        typeof v.productId === "object" ? v.productId?._id : v.productId;
      if (!catGroup.products.has(productKey)) {
        catGroup.products.set(productKey, {
          productName: v._productName,
          variants: [],
        });
      }
      catGroup.products.get(productKey).variants.push(v);
    });
    return Array.from(map.entries()).map(([, g]) => ({
      ...g,
      products: Array.from(g.products.values()),
    }));
  }, [sorted]);

  /* ── Summary numbers ────────────────────────────────────────────────────── */

  const totalUnits = useMemo(
    () => filtered.reduce((sum, v) => sum + v.currentStock, 0),
    [filtered]
  );
  const uniqueCategories = useMemo(
    () => new Set(filtered.map((v) => v._categoryId)).size,
    [filtered]
  );
  const uniqueProducts = useMemo(
    () =>
      new Set(
        filtered.map((v) =>
          typeof v.productId === "object" ? v.productId?._id : v.productId
        )
      ).size,
    [filtered]
  );

  /* ── CSV export ─────────────────────────────────────────────────────────── */

  const handleExport = () => {
    exportCsv(
      "current-stock-report.csv",
      [
        { label: "Category", value: (v) => v._categoryName },
        { label: "Product", value: (v) => v._productName },
        { label: "SKU", value: (v) => v.sku },
        { label: "Color", value: (v) => v.color },
        { label: "Size", value: (v) => v.size },
        { label: "Current Stock", value: (v) => v.currentStock },
        {
          label: "Stock Status",
          value: (v) => {
            if (v._status === "out") return "Out of Stock";
            if (v._status === "low") return "Low Stock";
            return "In Stock";
          },
        },
        { label: "Price", value: (v) => v.price },
      ],
      sorted
    );
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div className="page-container">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Current Inventory Stock</h1>
          <p className="page-header__subtitle">
            View every inventory item grouped by category and product.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleExport}
          disabled={fetching || sorted.length === 0}
        >
          Export CSV
        </button>
      </div>

      {fetching ? (
        <div className="card card--padded section">
          <LoadingSpinner label="Loading inventory stock…" />
        </div>
      ) : (
        <>
          {/* Summary strip */}
          <SummaryStrip
            totalUnits={totalUnits}
            categoryCount={uniqueCategories}
            productCount={uniqueProducts}
            variantCount={filtered.length}
          />

          {/* Controls */}
          <div className="cs-controls section">
            <input
              type="search"
              className="form-input cs-controls__search"
              placeholder="Search by category, product, SKU, color, size…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="form-select cs-controls__select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              className="form-select cs-controls__select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Stock Status</option>
              <option value="in">In Stock</option>
              <option value="low">Low Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            <select
              className="form-select cs-controls__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Product Name</option>
              <option value="highest">Highest Stock</option>
              <option value="lowest">Lowest Stock</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          {/* Grouped list */}
          {grouped.length === 0 ? (
            <div className="card cs-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="cs-empty__title">No items found</p>
              <p className="cs-empty__sub">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.categoryName} className="cs-group">
                {/* Category header */}
                <div className="cs-group__header">
                  <span className="cs-group__icon">📁</span>
                  <span className="cs-group__title">{group.categoryName}</span>
                  <span className="cs-group__count">
                    {group.products.reduce(
                      (sum, p) => sum + p.variants.length,
                      0
                    )}{" "}
                    variant
                    {group.products.reduce(
                      (sum, p) => sum + p.variants.length,
                      0
                    ) !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>

                {/* Products within this category */}
                {group.products.map((product) => {
                  const productUnits = product.variants.reduce(
                    (sum, v) => sum + v.currentStock,
                    0
                  );
                  return (
                    <div key={product.productName} className="cs-product">
                      <div className="cs-product__header">
                        <span className="cs-product__name">
                          {product.productName}
                        </span>
                        <span className="cs-product__units">
                          {productUnits} unit{productUnits !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <VariantRows variants={product.variants} />
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default CurrentStockPage;
