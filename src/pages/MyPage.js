import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OriginalLogo from '../image/OriginalLogo.png';

const Logo = styled.img`
  width: 215px;
  height: 320px;
`;
const Title = styled.div`
  color: #1c1e1c;
  font-family: 'Inter Bold';
  font-size: 20px;
  position: absolute;
  top: 450px;
`;
const Container = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MyPage = () => {
  return (
    <Container>
      <Logo src={OriginalLogo} />
      <Title>Sorry, We're not ready to open</Title>
    </Container>
  );
};

export default MyPage;
