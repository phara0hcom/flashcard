import React from "react";
import { NavLink } from "react-router-dom";

const Primary = () => {
  return (
    <div className="navigation">
      <input type="checkbox" class="navigation__checkbox" id="navi-toggle" />

      <label for="navi-toggle" className="navigation__bar">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink
              exact
              to="/flash"
              className="navigation__link"
              activeClassName="selected"
            >
              Home
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/flash/settings"
              className="navigation__link"
              activeClassName="selected"
            >
              Settings
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              to="/flash/about"
              className="navigation__link"
              activeClassName="selected"
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Primary;
