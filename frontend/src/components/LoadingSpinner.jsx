function LoadingSpinner({ label = "Loading" }) {
  return (
    <span className="loading-inline" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

export default LoadingSpinner;
