import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import LowStockTable from "../components/LowStockTable";
import RecentTransactionsTable from "../components/RecentTransactionsTable";
import InventoryValueCard from "../components/InventoryValueCard";
import "./DashboardPage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);
  const [totalCurrentStock, setTotalCurrentStock] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          statsResponse,
          lowStockResponse,
          transactionsResponse,
          inventoryValueResponse,
          variantsResponse,
        ] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/low-stock"),
          api.get("/dashboard/recent-transactions"),
          api.get("/dashboard/inventory-value"),
          api.get("/variants"),
        ]);

        setStats(statsResponse.data.data);
        setLowStockItems(lowStockResponse.data.data);
        setTransactions(transactionsResponse.data.data);
        setInventoryValue(
          inventoryValueResponse.data.data.totalInventoryValue
        );

        // Sum all variant currentStock values on the frontend
        const variants = variantsResponse.data.data;
        const stockSum = variants.reduce(
          (sum, v) => sum + (v.currentStock || 0),
          0
        );
        setTotalCurrentStock(stockSum);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Inventory Dashboard</h1>
          <p className="page-header__subtitle">
            A snapshot of your stock, catalog, and recent activity.
          </p>
        </div>
      </div>

      {stats && (
        <div className="stats-grid section">
          <StatCard title="Categories" value={stats.totalCategories} />
          <StatCard title="Products" value={stats.totalProducts} />
          <StatCard title="Variants" value={stats.totalVariants} />
          {/* Current Stock replaces the old Transactions card */}
          <StatCard
            title="Current Stock"
            value={totalCurrentStock}
            suffix="Units"
            onClick={() => navigate("/current-stock")}
          />
        </div>
      )}

      <div className="section">
        <InventoryValueCard value={inventoryValue} />
      </div>

      <div className="dashboard-split section">
        <div className="card dashboard-split__panel">
          <h2 className="section-title">Low Stock Items</h2>
          <LowStockTable items={lowStockItems} />
        </div>

        <div className="card dashboard-split__panel">
          <h2 className="section-title">Recent Transactions</h2>
          <RecentTransactionsTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;