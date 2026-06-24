function VariantTable({
  variants,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {variants.map((variant) => (
            <tr key={variant._id}>
              <td>{variant.sku}</td>

              <td>
                {variant.productId?.name}
              </td>

              <td>{variant.color}</td>

              <td>{variant.size}</td>

              <td>{variant.price}</td>

              <td>
                {variant.currentStock}
              </td>

              <td>
                <button
                  onClick={() =>
                    onEdit(variant)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        `Delete "${variant.sku}"?`
                      );

                    if (confirmed) {
                      onDelete(variant._id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VariantTable;