import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MenuBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: rgb(253, 106, 2);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
`;

const Menu = ({ setMenuOpen }) => {
  return (
    <MenuBar>
      <Link to="/landing">about us</Link>
      <Link to="/main">map</Link>
      <Link to="/my-jimventory">tickets</Link>
      <Link to="/my-page">my</Link>
    </MenuBar>
  );
};

export default Menu;
