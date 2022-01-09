import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { logoutAction } from "../../redux/auth/auth.actions";
import UserMenu from "../UserMenu/UserMenu";

import { HeaderStyle, LeftHeaderItem, RightHeaderItem } from "./Header.styles";

const Header = ({ logout, isLoggedIn }) => {
  let activeStyle = {
    textDecoration: "underline",
  };




  return (
    <HeaderStyle className="header">
      <LeftHeaderItem>Home page</LeftHeaderItem>
      {!isLoggedIn ? (
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
      ) : (
          <UserMenu />
      )}
    </HeaderStyle>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});



export default connect(mapStateToProps)(Header);
