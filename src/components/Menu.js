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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* box-shadow: 5px 4px 7px (0, 0, 0, 0.6); */
  border-top: 1px solid #d9d9d9;
`;
const IconContainer = styled.div`
  display: flex;
  width: 393px;
  justify-content: space-around;
  align-items: center;
`;
const TextContainer = styled.div`
  width: 393px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #0094ff;
  font-size: 10px;
  font-family: 'Inter ';
`;
const TextWrapper = styled.div`
  flex: 1;
  text-align: center;
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
        <InfoIcon icon={MenuInfo} onClick={() => navigate('/')} />
        <InfoIcon icon={MenuLocation} onClick={() => navigate('/main')} />
        <InfoIcon
          icon={MenuTicket}
          onClick={() => navigate('/my-jimventory')}
        />
        <InfoIcon icon={MenuMyPage} onClick={() => navigate('/my-page')} />
      </IconContainer>

      <TextContainer>
        <TextWrapper>
          <div>About us</div>
        </TextWrapper>
        <TextWrapper>
          <div>Map</div>
        </TextWrapper>
        <TextWrapper>
          <div>Booking page</div>
        </TextWrapper>
        <TextWrapper>
          <div>My page</div>
        </TextWrapper>
      </TextContainer>
    </MenuBar>
  );
};

export default Menu;
