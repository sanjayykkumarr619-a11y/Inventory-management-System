import "./StatCard.css";

/* Icon + accent color mapped purely by title text — presentational only.
   Falls back to a neutral default if the title doesn't match a known stat.
   No new props required, so DashboardPage.jsx does not need to change. */
const STAT_STYLES = {
  Categories: {
    accent: "blue",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  Products: {
    accent: "violet",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 8 12 3 3 8m18 0-9 5-9-5m18 0v8l-9 5-9-5V8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  Variants: {
    accent: "amber",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  Transactions: {
    accent: "green",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
};

const DEFAULT_STYLE = {
  accent: "blue",
  icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};

function StatCard({ title, value }) {
  const style = STAT_STYLES[title] || DEFAULT_STYLE;
  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value ?? "—";

  return (
    <div className="stat-card card">
      <div className={`stat-card__icon stat-card__icon--${style.accent}`}>
        {style.icon}
      </div>
      <p className="stat-card__title">{title}</p>
      <h2 className="stat-card__value">{displayValue}</h2>
    </div>
  );
}

export default StatCard;