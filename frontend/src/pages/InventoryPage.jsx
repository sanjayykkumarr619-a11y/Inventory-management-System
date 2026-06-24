import { useEffect, useState } from "react";
import api from "../api/axios";

import StockInForm from "../components/StockInForm";
import StockOutForm from "../components/StockOutForm";
import TransactionTable from "../components/TransactionTable";

import { getAdmin } from "../utils/auth";

function InventoryPage() {
  const [variants, setVariants] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const fetchVariants = async () => {
    try {
      const response = await api.get(
        "/variants"
      );

      setVariants(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await api.get(
        "/stock/history"
      );

      setTransactions(
        response.data.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchHistory();
  }, []);

  const handleStockIn = async (
    data
  ) => {
    try {
      const admin = getAdmin();

      await api.post("/stock/in", {
        ...data,
        reason: "RESTOCK",
        performedBy:
          admin._id,
      });

      fetchVariants();
      fetchHistory();

      alert(
        "Stock added successfully"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleStockOut = async (
    data
  ) => {
    try {
      const admin = getAdmin();

      await api.post("/stock/out", {
        ...data,
        reason: "SALE",
        performedBy:
          admin._id,
      });

      fetchVariants();
      fetchHistory();

      alert(
        "Stock removed successfully"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Inventory</h1>

      <StockInForm
        variants={variants}
        onSubmit={
          handleStockIn
        }
      />

      <br />

      <StockOutForm
        variants={variants}
        onSubmit={
          handleStockOut
        }
      />

      <br />

      <h2>
        Transaction History
      </h2>

      <TransactionTable
        transactions={
          transactions
        }
      />
    </div>
  );
}

export default InventoryPage;