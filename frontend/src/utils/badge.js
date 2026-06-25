export function getTransactionTypeBadgeClass(type) {
  if (type === "STOCK_IN") return "badge badge-success";
  if (type === "STOCK_OUT") return "badge badge-danger";
  return "badge badge-neutral";
}