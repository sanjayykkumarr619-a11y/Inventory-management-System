import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const createProduct = async (data) => {
  const category = await Category.findById(data.categoryId);
  if (!category || category.isDeleted) {
    throw new Error("Category not found");
  }

  const product = await Product.create(data);

  return product;
};

export const getProducts = async () => {
  return await Product.find({
    isDeleted: false,
  })
    .populate("categoryId", "name")
    .sort({ createdAt: -1 });
};

export const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};