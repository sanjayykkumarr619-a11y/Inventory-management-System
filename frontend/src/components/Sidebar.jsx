import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        borderRight: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <h2>StockFlow</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Link to="/">Dashboard</Link>

        <Link to="/categories">Categories</Link>

        <Link to="/products">Products</Link>

        <Link to="/variants">Variants</Link>

        <Link to="/inventory">Inventory</Link>
      </nav>

      <LogoutButton />
    </div>
  );
}

export default Sidebar;