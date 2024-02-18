import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MenuInfo from '../image/MenuInfo.png';
import MenuLocation from '../image/MenuLocation.png';
import MenuTicket from '../image/MenuTicket.png';
import MenuMyPage from '../image/MenuMypage.png';
const MenuBar = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  // width: 100%;
  height: 80px;
  background-color: rgb(255, 255, 255);
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0094ff;
  font-size: 10px;
  font-family: 'Inter ';
`;
const InfoIcon = styled.button`
  all: unset;
  background-image: url(${(props) => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 28px;
  height: 28px;
`;

const Menu = ({ setMenuOpen }) => {
  const navigate = useNavigate();
  return (
    <MenuBar>
      <IconContainer>
        <InfoIcon icon={MenuInfo} onClick={() => navigate('/landing')} />
        <div>About us</div>
      </IconContainer>
      <IconContainer>
        <InfoIcon icon={MenuLocation} onClick={() => navigate('/main')} />
        <div>Map</div>
      </IconContainer>
      <IconContainer>
        <InfoIcon
          icon={MenuTicket}
          onClick={() => navigate('/my-jimventory')}
        />
        <div>Booking page</div>
      </IconContainer>
      <IconContainer>
        <InfoIcon icon={MenuMyPage} onClick={() => navigate('/my-page')} />
        <div>My page</div>
      </IconContainer>
    </MenuBar>
  );
};

export default Menu;
