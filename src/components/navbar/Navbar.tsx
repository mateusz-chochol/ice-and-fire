import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "routing/routes";
import { routeIdentifiers } from "routing/routesIdentifiers";
import "styles/_Navbar.scss";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const onHomeButtonClick = () => {
    routes
      .find((route) => route.identifier === routeIdentifiers.index)
      ?.routingFunction(navigate);
  };

  return (
    <nav className="navbar">
      <span className="home-button" onClick={onHomeButtonClick}>
        Table of characters
      </span>
    </nav>
  );
};

export default Navbar;
