import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import { ToastProvider } from "./components/ToastProvider";

import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import VariantsPage from "./pages/VariantsPage";
import StockInPage from "./pages/StockInPage";
import StockOutPage from "./pages/StockOutPage";
import CurrentStockPage from "./pages/CurrentStockPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import "./styles/design-system.css";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <div className="app-shell">
                  <Sidebar />

                  <div className="main-content">
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/variants" element={<VariantsPage />} />
                      <Route path="/stock-in" element={<StockInPage />} />
                      <Route path="/stock-out" element={<StockOutPage />} />
                      <Route path="/current-stock" element={<CurrentStockPage />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
