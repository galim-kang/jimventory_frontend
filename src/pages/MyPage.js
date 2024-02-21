import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../api';
import styled from 'styled-components';
import OriginalLogo from '../image/OriginalLogo.png';
import CreateStorageModal from '../components/CreateStorageModal';

const Logo = styled.img`
  width: 230px;
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
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const userDetails = await getUserDetails();
  //     if (userDetails) {
  //       setUserInfo(userDetails);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Container>
      <Logo src={OriginalLogo} />
      <Title>Sorry, We're not ready to open</Title>
      {/* {userInfo ? (
        <div>
          <p>Welcome {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleOpenModal}>Create Storage</button>{" "}
        
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
      <CreateStorageModal show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
};

export default MyPage;
