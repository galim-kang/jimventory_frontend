import axios from "axios";

const API_URL = "http://localhost:8000/"; // 장고 백엔드 서버의 URL

// 회원가입 API 함수
export const registerUser = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_URL}users/signup/`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error during the registration:", error);
    return null;
  }
};

// 로그인 API 함수
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}users/api/token/`, {
      email,
      password,
    });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("Error during the login:", error);
    return null;
  }
};

// 로그아웃 API 함수
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};
//사용자 정보 조회
export const getUserDetails = async () => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.get(`${API_URL}users/details/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during fetching user details:", error);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    const response = await axios.post(
      "http://localhost:8000/api/token/refresh/",
      {
        refresh,
      }
    );
    localStorage.setItem("access", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error("Error during token refresh:", error);
    return null;
  }
};

// Storage 등록 API 함수
// ... 기존 코드 ...

export const createStorage = async (storageData) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.post(
      `${API_URL}storages/create/`,
      storageData,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during storage creation:", error);
    return null;
  }
};
export const getAllStorages = async () => {
  try {
    const response = await axios.get(`${API_URL}storages/storages/`);
    console.log(response.data, "storageData");
    return response.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    return [];
  }
};

export const getStorageDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}storages/storages/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching storage details:", error);
    return null;
  }
};

export const getReservations = () => {
  return axios.get(`${API_URL}reservations/reservations/`);
};

export const createReservation = async (reservationData) => {
  const access = localStorage.getItem("access");
  try {
    const response = await axios.post(
      `${API_URL}reservations/`,
      reservationData,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during reservation creation:", error);
    return null;
  }
};

export const getReservation = (id) => {
  return axios.get(`${API_URL}reservations/reservations/${id}/`);
};

export const updateReservation = (id, reservationData) => {
  return axios.put(
    `${API_URL}reservations/reservations/${id}/`,
    reservationData
  );
};

export const deleteReservation = (id) => {
  return axios.delete(`${API_URL}reservations/reservations/${id}/`);
};

export const getGeocode = async (address) => {
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": "aob8hc6abc",
          "X-NCP-APIGW-API-KEY": "zllmjQhfwpDBGlgTCVzq2BWKtCJttIKItPQ6nbSe",
        },
      }
    );
    const { x, y } = response.data.addresses[0];
    return { lat: y, lng: x };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
