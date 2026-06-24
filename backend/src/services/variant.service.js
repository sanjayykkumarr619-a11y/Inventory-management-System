import Variant from "../models/Variant.js";
import Product from "../models/Product.js";

export const createVariant = async (data) => {
  const product = await Product.findById(data.productId);

  if (!product || product.isDeleted) {
    throw new Error("Product not found");
  }

  const variant = await Variant.create(data);

  return variant;
};

export const getVariants = async () => {
  return await Variant.find({
    isDeleted: false,
  })
    .populate("productId", "name")
    .sort({ createdAt: -1 });
};

export const updateVariant = async (id, data) => {
  const variant = await Variant.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!variant) {
    throw new Error("Variant not found");
  }

  return variant;
};

export const deleteVariant = async (id) => {
  const variant = await Variant.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!variant) {
    throw new Error("Variant not found");
  }

  return variant;
};