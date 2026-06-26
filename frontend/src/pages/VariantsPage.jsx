import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import VariantTable from "../components/VariantTable";
import { useToast } from "../components/toastContext";
import { exportCsv } from "../utils/csv";

function VariantsPage() {
  const [variants, setVariants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      try {
        const response = await api.get("/variants");
        setVariants(response.data.data);
      } catch (error) {
        console.error(error);
        showToast("Unable to load variants", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [showToast]);

  const filteredVariants = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return variants;

    return variants.filter((variant) =>
      [
        variant.sku,
        variant.productId?.name,
        variant.color,
        variant.size,
        String(variant.price),
        String(variant.currentStock),
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [variants, searchTerm]);

  const handleExport = () => {
    exportCsv(
      "variants.csv",
      [
        { label: "Product", value: (variant) => variant.productId?.name },
        { label: "SKU", value: (variant) => variant.sku },
        { label: "Color", value: (variant) => variant.color },
        { label: "Size", value: (variant) => variant.size },
        { label: "Price", value: (variant) => variant.price },
        { label: "Stock", value: (variant) => variant.currentStock },
      ],
      filteredVariants
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Variants</h1>
          <p className="page-header__subtitle">
            View SKUs, pricing, and stock. Manage variants from Categories.
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
          placeholder="Search variants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="card card--padded">
          <LoadingSpinner label="Loading variants" />
        </div>
      ) : (
        <VariantTable variants={filteredVariants} />
      )}
    </div>
  );
}

export default VariantsPage;
