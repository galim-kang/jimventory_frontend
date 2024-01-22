import React, { useState } from "react";
import { createStorage } from "../api";

const CreateStorageModal = ({ show, handleClose }) => {
  const [storageData, setStorageData] = useState({
    storeType: "",
    serviceName: "",
    address: "",
    latitude: "",
    longitude: "",
    operatingTime: [], // 배열로 초기화
    description: [], // 배열로 초기화
    introduction: "",
    contact_info: "",
  });

  const handleChange = (e) => {
    setStorageData({ ...storageData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field) => {
    const items = e.target.value.split(",").map((item) => item.trim());
    setStorageData({ ...storageData, [field]: items });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = {
      ...storageData,
      latitude: parseFloat(storageData.latitude),
      longitude: parseFloat(storageData.longitude),
    };
    const response = await createStorage(preparedData);
    if (response) {
      handleClose(); // 모달 닫기
    } else {
      // 오류 처리
    }
  };

  if (!show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        <h2>Create Storage</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="storeType"
            value={storageData.storeType}
            onChange={handleChange}
            placeholder="Store Type"
          />
          <input
            type="text"
            name="serviceName"
            value={storageData.serviceName}
            onChange={handleChange}
            placeholder="Service Name"
          />
          <input
            type="text"
            name="address"
            value={storageData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="text"
            name="latitude"
            value={storageData.latitude}
            onChange={handleChange}
            placeholder="Latitude"
          />
          <input
            type="text"
            name="longitude"
            value={storageData.longitude}
            onChange={handleChange}
            placeholder="Longitude"
          />
          <input
            type="text"
            name="operatingTime"
            onChange={(e) => handleArrayChange(e, "operatingTime")}
            placeholder="Operating Time (e.g., 1000, 2300)"
          />
          <input
            type="text"
            name="description"
            onChange={(e) => handleArrayChange(e, "description")}
            placeholder="Description (e.g., 3층, 엘레베이터 있음)"
          />
          <input
            type="text"
            name="introduction"
            value={storageData.introduction}
            onChange={handleChange}
            placeholder="Introduction"
          />
          <input
            type="text"
            name="contact_info"
            value={storageData.contact_info}
            onChange={handleChange}
            placeholder="Contact Info"
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStorageModal;
