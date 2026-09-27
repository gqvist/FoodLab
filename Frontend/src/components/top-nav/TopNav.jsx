import "./TopNav.css";

import { NavLink } from "react-router-dom";

import { buttonVariants } from "../ui/button.jsx";
import { ProfileIcon } from "../../assets/icons/icons.jsx";
import foodLabLogo from "../../assets/logos/FoodLab.svg";

function TopNav() {
  return (
    <nav className="top-nav">
      <NavLink to="/home" className="top-nav-brand">
        <img src={foodLabLogo} alt="FoodLab" className="top-nav-logo" />
      </NavLink>

      <div className="top-nav-links">
        <NavLink to="/home" className={buttonVariants({ variant: "ghost" })}>
          Hem
        </NavLink>

        <NavLink to="/plan" className={buttonVariants({ variant: "ghost" })}>
          Planera
        </NavLink>

        <NavLink to="/recipes" className={buttonVariants({ variant: "ghost" })}>
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
  );
}

export default TopNav;
