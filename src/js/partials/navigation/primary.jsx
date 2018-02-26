import React from "react";
import { NavLink } from "react-router-dom";

const Primary = () => (
  <nav>
    <ul>
      <li>
        <NavLink exact to="/flash">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/flash/settings">Settings</NavLink>
      </li>
      {/* <li><NavLink to="/this/will/404">Broken link</NavLink></li> */}
    </ul>
  </nav>
);

export default Primary;
