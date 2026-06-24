import StockTransaction from "../models/StockTransaction.js";
import Variant from "../models/Variant.js";

export const stockIn = async (data) => {
  const variant = await Variant.findById(data.variantId);

  if (!variant) {
    throw new Error("Variant not found");
  }

  variant.currentStock += data.quantity;
  await variant.save();

  const transaction = await StockTransaction.create({
    ...data,
    type: "STOCK_IN",
  });

  return transaction;
};

export const stockOut = async (data) => {
  const variant = await Variant.findById(data.variantId);

  if (!variant) {
    throw new Error("Variant not found");
  }

  if (variant.currentStock < data.quantity) {
    throw new Error("Insufficient stock");
  }

  variant.currentStock -= data.quantity;
  await variant.save();

  const transaction = await StockTransaction.create({
    ...data,
    type: "STOCK_OUT",
  });

  return transaction;
};

export const getHistory = async () => {
  return await StockTransaction.find()
    .populate("variantId", "sku color size")
    .sort({ createdAt: -1 });
};