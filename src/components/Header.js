import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Header = () => (
  <header className="header">
    <Link to="/">
      <a>
        <Logo />
      </a>
    </Link>
    <p>
      Search
      <input type="text" />
    </p>
    <div className="header-links">
      <span className="home-link">
        <NavLink to="/" activeClassName="is-active" exact={true}>
          Home
        </NavLink>
      </span>
      <span className="message-link">
        <NavLink to="/message" activeClassName="is-active" exact={true}>
          messages
        </NavLink>
      </span>
      <span className="favorite-link">
        <NavLink to="/favorite" activeClassName="is-active" exact={true}>
          favorite
        </NavLink>
      </span>
      <span className="profile-link">
        <NavLink to="/profile" activeClassName="is-active" exact={true}>
          profile
        </NavLink>
      </span>
    </div>
  </header>
);

export default Header;
