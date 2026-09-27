import "./RegisterPage.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { register } from "../../lib/auth/register.js";
import foodLabLogo from "../../assets/logos/FoodLab.svg";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validates if passwords match and creates the account and redirects to /login
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, confirmPassword);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Registreringen misslyckades.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <img
          src={foodLabLogo}
          alt="FoodLab"
          className="register-logo"
        />

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
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

          <div className="register-field">
            <Label htmlFor="password">Lösenord</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Lösenord"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="register-field">
            <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Bekräfta lösenord"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          {error && (
            <p className="register-error" role="alert">
              {error}
            </p>
          )}

          <Button size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Skapar konto..." : "Skapa konto"}
          </Button>
        </form>
      </div>
    </main>
  );
}
