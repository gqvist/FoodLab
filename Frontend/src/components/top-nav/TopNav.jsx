import "./TopNav.css"
import grubPlannerLogo from "../../assets/logos/GrubPlanner.svg"

import { NavLink } from "react-router-dom"
import { buttonVariants } from "../ui/button.jsx"
import { ProfileIcon } from "../../assets/icons/icons.jsx"

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
        <NavLink
          to="/home"
          className={buttonVariants({ variant: "ghost" })}
        >
          Hem
        </NavLink>

        <NavLink
          to="/plan"
          className={buttonVariants({ variant: "ghost" })}
        >
          Planera
        </NavLink>

        <NavLink
          to="/recipes"
          className={buttonVariants({ variant: "ghost" })}
        >
          Recept
        </NavLink>

        <NavLink
          to="/profile"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          aria-label="Konto"
        >
          <ProfileIcon />
        </NavLink>
      </div>
    </nav>
  )
}

export default TopNav
