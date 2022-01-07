import React from "react";

import { NavLink } from "react-router-dom";

import { HeaderStyle, LeftHeaderItem, RightHeaderItem } from "./Header.styles";

const Header = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

//   let activeClassName = "underline";

  return (
    <HeaderStyle className="header">
      <LeftHeaderItem>Home page</LeftHeaderItem>
      <RightHeaderItem>
        <NavLink
          to="/login"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Login
        </NavLink>{" "}
        /{" "}
        <NavLink
          to="/signup"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Sign up
        </NavLink>
      </RightHeaderItem>
      <RightHeaderItem>
        <NavLink to="/logout">Logout</NavLink>
      </RightHeaderItem>
    </HeaderStyle>
  );
};

export default Header;
