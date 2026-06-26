export const getEntityId = (value) => {
  if (!value) return "";
  return typeof value === "object" ? value._id : value;
};

export const getCategoryId = (product) => getEntityId(product?.categoryId);

export const getProductId = (variant) => getEntityId(variant?.productId);

export const getProductName = (product) => product?.name || "Unassigned";

export const getCategoryName = (product, categories = []) => {
  if (product?.categoryId?.name) return product.categoryId.name;

  const categoryId = getCategoryId(product);
  return (
    categories.find((category) => category._id === categoryId)?.name ||
    "Unassigned"
  );
};

export const getVariantLabel = (variant) =>
  [variant?.sku, variant?.productId?.name, variant?.color, variant?.size]
    .filter(Boolean)
    .join(" ");
