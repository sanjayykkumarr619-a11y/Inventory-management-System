import {
  getDashboardStats,
  getLowStockItems,
  getRecentTransactions,
  getInventoryValue,
} from "../services/dashboard.service.js";

export const stats = async (req, res) => {
  try {
    const data = await getDashboardStats();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const lowStock = async (req, res) => {
  try {
    const data = await getLowStockItems();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const recentTransactions = async (req, res) => {
  try {
    const data = await getRecentTransactions();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const inventoryValue = async (req, res) => {
  try {
    const data = await getInventoryValue();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};