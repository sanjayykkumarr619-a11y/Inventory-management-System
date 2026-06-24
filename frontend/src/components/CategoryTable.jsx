function CategoryTable({
  categories,
  onDelete,
  onEdit,
}) {
  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>

              <td>
                {new Date(
                  category.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                <button
                  onClick={() =>
                    onEdit(category)
                  }
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Are you sure you want to delete "${category.name}"?`
                    );

                    if (confirmed) {
                      onDelete(category._id);
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

export default CategoryTable;