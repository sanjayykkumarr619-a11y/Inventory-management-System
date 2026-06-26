function CategoryTable({ categories, onDelete, onEdit }) {
  const showActions = Boolean(onEdit || onDelete);

  return (
    <div className="table-wrapper">
      <table className="table-modern">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            {showActions && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>

              <td>{new Date(category.createdAt).toLocaleDateString()}</td>

              {showActions && (
                <td>
                  <div className="action-buttons">
                    {onEdit && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => onEdit(category)}
                      >
                        Edit
                      </button>
                    )}

                    {onDelete && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(category)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <div className="table-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <p>No categories yet</p>
        </div>
      )}
    </div>
  );
}

export default CategoryTable;
