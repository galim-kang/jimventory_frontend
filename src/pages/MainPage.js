import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Jimventory from '../components/Jimventory';
import MarkerTrue from '../image/MarkerTrue.png';
import MarkerFalse from '../image/MarkerFalse.png';
import SearchBar from '../components/SearchBar';
import MyLocationIcon from '../image/MyLocation.png';
import UserIcon from '../image/UserIcon.png';
import axios from 'axios';
import { dummyStorages } from '../dummyData/getAllStorages';

const CurrentLocationButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 20px;
  border: none;
  border-radius: 50px;
  background-color: #0094ff;
  width: 60px;
  height: 60px;
  bottom: 112px;
  right: 13px;
  &:hover {
    transform: translateY(1px);
  }
  &:hover:before {
    width: 0;
  }
`;

function Main() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [storageData, setStorageData] = useState([]);

  const handleCenterToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const onSearchLocation = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json?query=${searchValue}&display=10&start=1&sort=random`,
        {
          headers: {
            'X-Naver-Client-Id': 'QW3w2VwojlAzqDun8Ugk', // 검색 api 클라이언트 아이디 , env로 변경할 것
            'X-Naver-Client-Secret': 'arriPcMvzT',
          },
        },
      );
      console.log(response);
      const { mapx, mapy } = response.data.items[0];
      const location = { lat: mapy * 0.0000001, lng: mapx * 0.0000001 };
      setCurrentLocation(location);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchStorages = async () => {
      // const storages = await getAllStorages(); // ===============> api 주석처리
      // setStorageData(storages); // ============> api 주석에 따른 주석처리
      setStorageData(dummyStorages);
      console.log(dummyStorages, 'dummyStorages');
    };
    fetchStorages();
  }, []);

  return (
    <div className="main-container" style={{ position: 'relative' }}>
      <MapDiv
        style={{
          width: '393px',
          height: '852px',
        }}
      >
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearchLocation={onSearchLocation}
          handleCenterToCurrentLocation={handleCenterToCurrentLocation}
        />
        {/* storage 하나 클릭했을 때 하단에 뜨는 컴포넌트 */}
        <Jimventory
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <NaverMap defaultZoom={16} center={currentLocation}>
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: UserIcon,
                anchor: { x: 12, y: 36 },
                scaledSize: { width: 36, height: 36 },
              }}
            />
          )}
          {storageData.map((storage, index) => (
            <div key={index}>
              <Marker
                position={{
                  lat: storage.latitude,
                  lng: storage.longitude,
                }}
                onClick={() => {
                  setSelectedItem(storage);
                }}
                icon={{
                  url: storage.available === true ? MarkerTrue : MarkerFalse, // 아이콘 이미지 URL
                  anchor: { x: 12, y: 36 },
                  scaledSize: { width: 46, height: 63 },
                }}
              />
            </div>
          ))}
        </NaverMap>
        <CurrentLocationButton onClick={handleCenterToCurrentLocation}>
          <img style={{ width: 35, height: 35 }} src={MyLocationIcon} />
        </CurrentLocationButton>
      </MapDiv>
    </div>
  );
}

export default Main;
