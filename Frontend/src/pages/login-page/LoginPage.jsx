import "./LoginPage.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import foodLabLogo from "../../assets/logos/FoodLab.svg";
import { login } from "../../lib/auth/login.js";
import { Button } from "../../components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Alert, AlertDescription } from "../../components/ui/alert.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Spinner } from "../../components/ui/spinner.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Submits email/password and redirects to home if authenticated
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
        error instanceof Error ? error.message : "Inloggningen misslyckades.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <Card className="login-container">
        <CardHeader className="login-header">
          <img src={foodLabLogo} alt="FoodLab" className="login-logo" />
          <CardTitle className="text-xl">Välkommen tillbaka</CardTitle>
          <CardDescription>Logga in för att fortsätta till FoodLab.</CardDescription>
        </CardHeader>

        <CardContent>
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
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button size="lg" type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}
            {isLoading ? "Loggar in..." : "Logga in"}
          </Button>
        </form>
        <p className="no-account-text">
          Inget konto?
          <Link to="/register" className="no-account-button">
            Skapa ett här
          </Link>
        </p>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginPage;
