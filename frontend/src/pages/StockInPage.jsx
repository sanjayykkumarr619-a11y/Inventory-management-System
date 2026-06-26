import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import LoadingSpinner from "../components/LoadingSpinner";
import StockInForm from "../components/StockInForm";
import TransactionTable from "../components/TransactionTable";
import { useToast } from "../components/toastContext";

import { getAdmin } from "../utils/auth";
import { exportCsv } from "../utils/csv";
import "./InventoryPage.css";

const transactionMatches = (transaction, query) =>
  [
    transaction.variantId?.sku,
    transaction.variantId?.color,
    transaction.variantId?.size,
    transaction.type,
    transaction.reason,
    transaction.notes,
    String(transaction.quantity),
  ]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(query));

function StockInPage() {
  const [variants, setVariants] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const fetchData = useCallback(async () => {
    setFetching(true);
    try {
      const [variantResponse, historyResponse] = await Promise.all([
        api.get("/variants"),
        api.get("/stock/history"),
      ]);

      setVariants(variantResponse.data.data);
      // Only keep STOCK_IN transactions
      setTransactions(
        historyResponse.data.data.filter((t) => t.type === "STOCK_IN")
      );
    } catch (error) {
      console.error(error);
      showToast("Unable to load stock in data", "error");
    } finally {
      setFetching(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredTransactions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return transactions;
    return transactions.filter((transaction) =>
      transactionMatches(transaction, query)
    );
  }, [transactions, searchTerm]);

  const handleStockIn = async (data) => {
    const admin = getAdmin();
    setSaving(true);
    try {
      await api.post("/stock/in", {
        ...data,
        reason: "RESTOCK",
        performedBy: admin._id,
      });
      await fetchData();
      showToast("Stock Added");
    } catch (error) {
      console.error(error);
      showToast(error?.response?.data?.message || "Stock update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    exportCsv(
      "stock-in-history.csv",
      [
        { label: "SKU", value: (t) => t.variantId?.sku },
        { label: "Type", value: (t) => t.type },
        { label: "Quantity", value: (t) => t.quantity },
        { label: "Reason", value: (t) => t.reason },
        { label: "Notes", value: (t) => t.notes },
        { label: "Date", value: (t) => t.createdAt },
      ],
      filteredTransactions
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Stock In</h1>
          <p className="page-header__subtitle">
            Record incoming stock and review stock in history.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleExport}>
          Export CSV
        </button>
      </div>

      {fetching ? (
        <div className="card card--padded section">
          <LoadingSpinner label="Loading stock in data" />
        </div>
      ) : (
        <>
          <div className="section">
            <StockInForm variants={variants} onSubmit={handleStockIn} loading={saving} />
          </div>

          <div className="toolbar section">
            <input
              className="form-input toolbar__search"
              type="search"
              placeholder="Search stock in transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <section className="card card--padded inventory-page-history section">
            <h2 className="section-title">Stock In History</h2>
            <TransactionTable transactions={filteredTransactions} />
          </section>
        </>
      )}
    </div>
  );
}

export default StockInPage;
