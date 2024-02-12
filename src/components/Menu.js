import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MenuInfo from '../image/MenuInfo.png';
import MenuLocation from '../image/MenuLocation.png';
import MenuTicket from '../image/MenuTicket.png';
import MenuMyPage from '../image/MenuMypage.png';
const MenuBar = styled.div`
  position: absolute;
  bottom: 0;
  right : 0;
  left : 0;
  // width: 100%;
  height: 100px;
  background-color: rgb(255,55,55);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
`;
const InfoIcon = styled.button`
all: unset;
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width : 60px;
  height: 60px;
`


const Menu = ({ setMenuOpen }) => {
  const navigate = useNavigate();
  return (
    <MenuBar>

        <InfoIcon icon={MenuInfo} onClick={() => navigate('/landing')}/>
        <InfoIcon icon={MenuLocation} onClick={() => navigate('/main')}/>
        <InfoIcon icon={MenuTicket} onClick={() => navigate('/my-jimventory')}/>
        <InfoIcon icon={MenuMyPage} onClick={() => navigate('/my-page')}/>
    </MenuBar>
  );
};

export default Menu;
