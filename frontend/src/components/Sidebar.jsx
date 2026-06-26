import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./sidebar.css";

/* Inline SVG icons — no extra dependency required.
   Swap these for an icon library later if you add one; markup-only change. */
const icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" fill="currentColor" />
    </svg>
  ),
  categories: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  products: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 8 12 3 3 8m18 0-9 5-9-5m18 0v8l-9 5-9-5V8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  variants: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  stockIn: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  stockOut: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 20V4m0 0 6 6M12 4l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const navItems = [
  { to: "/", label: "Dashboard", icon: icons.dashboard },
  { to: "/categories", label: "Categories", icon: icons.categories },
  { to: "/products", label: "Products", icon: icons.products },
  { to: "/variants", label: "Variants", icon: icons.variants },
  { to: "/stock-in", label: "Stock In", icon: icons.stockIn },
  { to: "/stock-out", label: "Stock Out", icon: icons.stockOut },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand__mark">S</span>
        <span className="sidebar-brand__name">StockFlow</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link--active" : "")
            }
          >
            <span className="sidebar-link__icon">{item.icon}</span>
            <span className="sidebar-link__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <LogoutButton />
      </div>
    </aside>
  );
}

export default Sidebar;
