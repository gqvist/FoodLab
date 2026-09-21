import "./LoginPage.css";
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/auth/login.js";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Type } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setError("");
    setIsLoading(true);

    try {
      await login(formData.get("email").trim(), formData.get("password"));

      navigate("/home", { replace: true });
    } catch (error) {
      setError(
        error instanceof TypeError
          ? "Kunde inte ansluta till servern. Försök igen."
          : error.message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <img src={grubPlannerLogo} alt="GrubPlanner" className="login-logo" />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="E-post"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-field">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Lösenord"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <Button size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="no-account-text">
          Inget konto?
          <Link to="/register" className="no-account-button">
            Skapa ett här
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
