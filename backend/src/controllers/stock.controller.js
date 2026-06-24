import {
  stockIn,
  stockOut,
  getHistory,
} from "../services/stock.service.js";

export const addStock = async (req, res) => {
  try {
    const transaction = await stockIn(req.body);

    res.status(201).json({
      success: true,
      message: "Stock added successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeStock = async (req, res) => {
  try {
    const transaction = await stockOut(req.body);

    res.status(201).json({
      success: true,
      message: "Stock removed successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const history = async (req, res) => {
  try {
    const transactions = await getHistory();

    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};