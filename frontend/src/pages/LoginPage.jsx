import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.data.admin)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand__mark">S</span>
          <span className="login-brand__name">StockFlow</span>
        </div>

        <div className="login-card__header">
          <h1 className="login-card__title">Welcome back</h1>
          <p className="login-card__subtitle">
            Sign in to manage your inventory.
          </p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="you@company.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary login-form__submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;