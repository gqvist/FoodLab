import "./TopNav.css";

import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookmarkIcon,
  BookOpenIcon,
  LogOutIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Button, buttonVariants } from "../ui/button.jsx";
import { Separator } from "../ui/separator.jsx";
import { Spinner } from "../ui/spinner.jsx";
import { ProfileIcon } from "../../assets/icons/icons.jsx";
import foodLabLogo from "../../assets/logos/FoodLab.svg";
import { logout } from "../../lib/auth/logout.js";

function TopNav() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const profileButtonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
        setLogoutError("");
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setLogoutError("");
        profileButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
    setLogoutError("");
  }

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Kunde inte logga ut. Försök igen.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

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

        <Separator
          className="top-nav-divider"
          orientation="vertical"
          aria-hidden="true"
        />

        <div className="top-nav-profile" ref={menuRef}>
          <Button
            ref={profileButtonRef}
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Öppna kontomeny"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="top-nav-profile-menu"
            onClick={toggleMenu}
          >
            <ProfileIcon />
          </Button>

          {isMenuOpen && (
            <div
              id="top-nav-profile-menu"
              className="top-nav-profile-menu"
              role="dialog"
              aria-label="Kontomeny"
            >
              <NavLink
                to="/shopping-list"
                className={buttonVariants({
                  variant: "ghost",
                  className: "top-nav-menu-link",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCartIcon aria-hidden="true" />
                Inköpslista
              </NavLink>
              <NavLink
                to="/my-recipes"
                className={buttonVariants({
                  variant: "ghost",
                  className: "top-nav-menu-link",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpenIcon aria-hidden="true" />
                Mina recept
              </NavLink>
              <NavLink
                to="/saved-recipes"
                className={buttonVariants({
                  variant: "ghost",
                  className: "top-nav-menu-link",
                })}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookmarkIcon aria-hidden="true" />
                Sparade recept
              </NavLink>

              <Separator className="top-nav-menu-divider" aria-hidden="true" />

              {logoutError && (
                <p className="top-nav-logout-error" role="alert">
                  {logoutError}
                </p>
              )}

              <Button
                className="top-nav-logout"
                variant="destructive"
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
              >
                {isLoggingOut ? (
                  <Spinner />
                ) : (
                  <LogOutIcon aria-hidden="true" />
                )}
                {isLoggingOut ? "Loggar ut..." : "Logga ut"}
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default TopNav;
