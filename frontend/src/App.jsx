import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsPage";
import VariantsPage from "./pages/VariantsPage";
import InventoryPage from "./pages/InventoryPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
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
              <div
                style={{
                  display: "flex",
                }}
              >
                <Sidebar />

                <div
                  style={{
                    flex: 1,
                    padding: "20px",
                  }}
                >
                  <Routes>
                    <Route
                      path="/"
                      element={<DashboardPage />}
                    />

                    <Route
                      path="/categories"
                      element={<CategoriesPage />}
                    />

                    <Route
                      path="/products"
                      element={<ProductsPage />}
                    />

                    <Route
                      path="/variants"
                      element={<VariantsPage />}
                    />

                    <Route
                      path="/inventory"
                      element={<InventoryPage />}
                    />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;