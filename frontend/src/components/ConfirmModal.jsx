function ConfirmModal({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title" className="modal-card__title">
          {title}
        </h2>
        <p className="modal-card__message">{message}</p>
        <div className="modal-card__actions">
          <button className="btn btn-secondary" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger" type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
