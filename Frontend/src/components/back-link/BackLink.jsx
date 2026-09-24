import "./BackLink.css";

import { Link } from "react-router-dom";

import { BackArrowIcon } from "../../assets/icons/icons";

export default function BackLink({ to = "/home", label = "Till startsidan" }) {
  return (
    <div className="back-link">
      <Link to={to} className="back-link-icon" aria-label={label}>
        <BackArrowIcon aria-hidden="true" />
      </Link>
      <span>{label}</span>
    </div>
  );
}
