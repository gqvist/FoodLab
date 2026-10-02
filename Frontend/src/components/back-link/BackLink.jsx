import "./BackLink.css";

import { Link } from "react-router-dom";

import { BackArrowIcon } from "../../assets/icons/icons";
import { buttonVariants } from "../ui/button.jsx";

export default function BackLink({ to = "/home", label = "Till startsidan" }) {
  return (
    <div className="back-link">
      <Link
        to={to}
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label={label}
      >
        <BackArrowIcon aria-hidden="true" />
      </Link>
      <span>{label}</span>
    </div>
  );
}
