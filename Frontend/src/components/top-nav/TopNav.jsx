import "./TopNav.css";

import { NavLink } from "react-router-dom";

import { buttonVariants } from "../ui/button.jsx";
import { ProfileIcon } from "../../assets/icons/icons.jsx";
import foodLabLogo from "../../assets/logos/FoodLab.svg";

function TopNav() {
  return (
    <header className="top-nav">
      <NavLink to="/home" className="top-nav-brand">
        <img src={foodLabLogo} alt="FoodLab" className="top-nav-logo" />
      </NavLink>

      <nav className="top-nav-pill" aria-label="Huvudnavigation">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "secondary" : "ghost" })
          }
        >
          Hem
        </NavLink>

        <NavLink
          to="/plan"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "secondary" : "ghost" })
          }
        >
          Planera
        </NavLink>

        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "secondary" : "ghost" })
          }
        >
          Recept
        </NavLink>

        <span className="top-nav-divider" aria-hidden="true" />

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              size: "icon",
            })
          }
          aria-label="Konto"
        >
          <ProfileIcon />
        </NavLink>
      </nav>
    </header>
  );
}

export default TopNav;
