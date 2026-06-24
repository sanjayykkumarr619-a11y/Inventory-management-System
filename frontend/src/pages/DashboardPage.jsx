import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import LowStockTable from "../components/LowStockTable";
import RecentTransactionsTable from "../components/RecentTransactionsTable";
import InventoryValueCard from "../components/InventoryValueCard";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [inventoryValue, setInventoryValue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          statsResponse,
          lowStockResponse,
          transactionsResponse,
          inventoryValueResponse,
        ] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/low-stock"),
          api.get("/dashboard/recent-transactions"),
          api.get("/dashboard/inventory-value"),
        ]);

        setStats(statsResponse.data.data);
        setLowStockItems(lowStockResponse.data.data);
        setTransactions(transactionsResponse.data.data);
        setInventoryValue(
          inventoryValueResponse.data.data.totalInventoryValue
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Dashboard</h1>

      {stats && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <StatCard
            title="Categories"
            value={stats.totalCategories}
          />

          <StatCard
            title="Products"
            value={stats.totalProducts}
          />

          <StatCard
            title="Variants"
            value={stats.totalVariants}
          />

          <StatCard
            title="Transactions"
            value={stats.totalTransactions}
          />
        </div>
      )}

      <InventoryValueCard value={inventoryValue} />

      <br />

      <LowStockTable items={lowStockItems} />

      <br />

      <RecentTransactionsTable
        transactions={transactions}
      />
    </div>
  );
}

export default DashboardPage;