import Category from "../models/Category.js";

export const createCategory = async (name) => {
  const existingCategory = await Category.findOne({
    name,
    isDeleted: false,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
  });

  return category;
};

export const getCategories = async () => {
  return await Category.find({
    isDeleted: false,
  }).sort({ createdAt: -1 });
};
export const updateCategory = async (id, name) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};