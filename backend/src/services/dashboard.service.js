import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Variant from "../models/Variant.js";
import StockTransaction from "../models/StockTransaction.js";

export const getDashboardStats = async () => {
  const totalCategories = await Category.countDocuments({
    isDeleted: false,
  });

  const totalProducts = await Product.countDocuments({
    isDeleted: false,
  });

  const totalVariants = await Variant.countDocuments({
    isDeleted: false,
  });

  const totalTransactions = await StockTransaction.countDocuments();

  return {
    totalCategories,
    totalProducts,
    totalVariants,
    totalTransactions,
  };
};

export const getLowStockItems = async () => {
  const variants = await Variant.find({
    isDeleted: false,
  }).populate("productId", "name");

  return variants.filter(
    (variant) =>
      variant.currentStock <= variant.lowStockThreshold
  );
};
export const getRecentTransactions = async () => {
  return await StockTransaction.find()
    .populate("variantId", "sku color size")
    .populate("performedBy", "name")
    .sort({ createdAt: -1 })
    .limit(5);
}; 
export const getInventoryValue = async () => {
  const variants = await Variant.find({
    isDeleted: false,
  });

  const totalInventoryValue = variants.reduce(
    (total, variant) =>
      total + variant.price * variant.currentStock,
    0
  );

  return {
    totalInventoryValue,
  };
}; 