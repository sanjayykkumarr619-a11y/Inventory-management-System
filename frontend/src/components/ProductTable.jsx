function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.brand}</td>

              <td>
                {product.categoryId?.name}
              </td>

              <td>
                <button
                  onClick={() =>
                    onEdit(product)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => {
                    const confirmed =
                      window.confirm(
                        `Delete "${product.name}"?`
                      );

                    if (confirmed) {
                      onDelete(product._id);
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

export default ProductTable;