import "./LoginPage.css"
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg"

import { Button } from "../../components/ui/button.jsx"
import { Input } from "../../components/ui/input.jsx"
import { Label } from "../../components/ui/label.jsx"

function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-container">
        <img
            src={grubPlannerLogo}
            alt="GrubPlanner"
            className="login-logo"
        />

        <form className="login-form">
          <div className="form-field">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="form-field">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <Button size="lg" type="submit">
            Login
          </Button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage