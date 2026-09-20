import "./LoginPage.css";
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";

function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-container">
        <img src={grubPlannerLogo} alt="GrubPlanner" className="login-logo" />

        <form className="login-form">
          <div className="form-field">
            <Label htmlFor="email">E-post</Label>
            <Input id="email" type="email" placeholder="E-post" />
          </div>

          <div className="form-field">
            <Label htmlFor="password">Lösenord</Label>
            <Input id="password" type="password" placeholder="Lösenord" />
          </div>

          <Button size="lg" type="submit">
            Login
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