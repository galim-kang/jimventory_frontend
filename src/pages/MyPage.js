import React, { useState, useEffect } from "react";
import { getUserDetails } from "../api";

import CreateStorageModal from "../components/CreateStorageModal";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userDetails = await getUserDetails();
      if (userDetails) {
        setUserInfo(userDetails);
      }
    };

    fetchData();
  }, []);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <h1>My Page</h1>
      {userInfo ? (
        <div>
          <p>Welcome {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleOpenModal}>Create Storage</button>{" "}
          {/* 버튼 추가 */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <CreateStorageModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default MyPage;
