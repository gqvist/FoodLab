import "./TopNav.css"
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg"

import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ProfileIcon } from "@/assets/icons/Icons"

function TopNav() {
  return (
    <nav className="top-nav">
      <NavLink to="/home" className="top-nav-brand">
        <img
          src={grubPlannerLogo}
          alt="GrubPlanner"
          className="top-nav-logo"
        />
      </NavLink>

      <div className="top-nav-links">
        <Button variant="ghost" asChild>
          <NavLink to="/home">Hem</NavLink>
        </Button>

        <Button variant="ghost" asChild>
          <NavLink to="/plan">Planera</NavLink>
        </Button>

        <Button variant="ghost" asChild>
          <NavLink to="/recipes">Recept</NavLink>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Konto"
        >
          <ProfileIcon />
        </Button>
      </div>
    </nav>
  )
}

export default TopNav