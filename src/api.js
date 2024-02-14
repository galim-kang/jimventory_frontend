import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // 장고 백엔드 서버의 URL

const instance = axios.create({
  baseURL: `${API_URL}`,
});
const access = localStorage.getItem('access');
// 회원가입 API 함수 - 썼다고 함
export const registerUser = async (username, password, email) => {
  try {
    const response = await instance.post('users/signup/', {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error during the registration:', error);
    return null;
  }
};

// 로그인 API 함수- 썼다고 함
export const loginUser = async (email, password) => {
  try {
    const response = await instance.post('users/api/token/', {
      email,
      password,
    });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Error during the login:', error);
    return null;
  }
};

// 로그아웃 API 함수
export const logoutUser = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};
//사용자 정보 조회- 썼다고 함
export const getUserDetails = async () => {
  // const access = localStorage.getItem("access");
  try {
    const response = await instance.get('users/details/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during fetching user details:', error);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    const response = await instance.post('api/token/refresh/', {
      refresh,
    });
    localStorage.setItem('access', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error during token refresh:', error);
    return null;
  }
};

// Storage 등록 API 함수
// ... 기존 코드 ...

export const createStorage = async (storageData) => {
  //- 썼다고 함
  // const access = localStorage.getItem("access");
  try {
    const response = await instance.post('storages/create/', storageData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during storage creation:', error);
    return null;
  }
};
export const getAllStorages = async () => {
  // 된다고 함
  try {
    const response = await instance.get('storages/storages/');
    // console.log(response.data, "storageData");
    return response.data;
  } catch (error) {
    console.error('Error fetching storages:', error);
    return [];
  }
};

export const getStorageDetails = async (id) => {
  // 된다고 함
  try {
    const response = await instance.get(`storages/storages/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching storage details:', error);
    return null;
  }
};

export const getReservations = async () => {
  try {
    const response = await instance.get('reservations/', {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('get reservation error', error);
  }
}; // 예약정보 가져오는게 왜 토큰인증 로직이 없나요?

export const createReservation = async (reservationData) => {
  // const access = localStorage.getItem("access");
  try {
    const response = await instance.post('reservations/', reservationData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during reservation creation:', error);
    return null;
  }
};

export const getReservation = (id) => {
  return instance.get(`reservations/reservations/${id}/`);
}; // 마찬가지로 왜 토큰 인증이 없나요?

export const updateReservation = (id, reservationData) => {
  return instance.put(`reservations/reservations/${id}/`, reservationData);
};

export const deleteReservation = (id) => {
  return instance.delete(`reservations/reservations/${id}/`);
};

export const getGeocode = async (address) => {
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
        address,
      )}`,
      {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'aob8hc6abc',
          'X-NCP-APIGW-API-KEY': 'zllmjQhfwpDBGlgTCVzq2BWKtCJttIKItPQ6nbSe',
        },
      },
    );
    const { x, y } = response.data.addresses[0];
    return { lat: y, lng: x };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};
