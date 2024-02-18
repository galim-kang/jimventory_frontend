import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
// import { Polyline } from "react-naver-maps";
import Jimventory from '../components/Jimventory';
import MarkerTrue from '../image/MarkerTrue.png';
import MarkerFalse from '../image/MarkerFalse.png';
import SearchBar from '../components/SearchBar';
import MyLocationIcon from '../image/MyLocation.png';
import MarkerIcon from '../image/MarkerIcon .png';
import UserIcon from '../image/UserIcon.png';
import axios from 'axios';
import { dummyStorages } from '../dummyData/getAllStorages';
import { getAllStorages } from '../api';

const CurrentLocationButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 20px;
  border: none;
  border-radius: 50px;
  /* box-shadow: rgba(84, 84, 85, 0.8) 0px 0px 8px; */
  /* background-image: url(${MyLocationIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60px; */
  background-color: #0094ff;
  width: 60px;
  height: 60px;
  bottom: 112px;
  right: 13px;
  /* width: 20px; */
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
  // const cache = {}; // 계속 초기화 되는데 어떻게 저장해놓는다는 소리...? 차라리 데이터베이스 쓰는게 낫겠다.
  const onSearchLocation = async () => {
    // 캐시에서 값을 찾아서 있으면 캐시된 값을 반환
    // if (cache[searchValue]) {
    //   getSearchPosition(cache[searchValue]);
    //   return;
    // }
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
      // console.log(location, "dd");
      setCurrentLocation(location);
      // cache[searchValue] = result;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Storage 데이터를 불러오는 함수
    const fetchStorages = async () => {
      // const storages = await getAllStorages(); // ===============> api 주석처리
      // setStorageData(storages); // ============> api 주석에 따른 주석처리
      setStorageData(dummyStorages);
      console.log(dummyStorages, 'dummyStorages');
    };
    fetchStorages();
  }, []); // storage가 현재는 몇 개 없지만, 많아질 경우 한번에 불러오는 것은 무리일 듯.
  // currentLocation 중심으로 범위 지정해서 몇개씩 받아오도록 추후에 수정해야함.
  // 1. 그러면 처음에는 초기 설정된 위치 범위로
  // 2. 사용자 위치 지정하면 그 위치 범위로
  // 3. 주소 검색하면 그 위치 범위로
  // useEffect로 데이터 불러올 시에 의존성 배열에 currentLocation 혹은 현재 위치 값이 담겨야 함.

  return (
    <div className="main-container" style={{ position: 'relative' }}>
      <MapDiv
        style={{
          width: '393px',
          height: '852px',
        }}
      >
        {/* map과 동일한 크기를 가지게 하여 inner box-shadow를 주면서, 마우스이벤트는 작동하지 않게 하여 map과 searchbar클릭이 가능 */}
        {/* <div
          style={{
            position: 'absolute',
            zIndex: 100,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            boxShadow:
              'inset -12px -12px 16px rgb(154,154, 172, 0.32), ' +
              'inset 7px 7px 9px rgba(225, 225, 225, 0.6)',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        /> */}
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
          {/* {selectedItem && <Polyline
         path={[start, end]} 
         strokeColor="#5347AA" 
         strokeOpacity={0.5} 
         strokeWeight={3.5} 
        />} */}
          {currentLocation && ( // 내 위치 보기 눌렀을 때 내 위치를 마커 표시
            <Marker
              position={currentLocation}
              icon={{
                url: UserIcon, // 아이콘 이미지 URL
                anchor: { x: 12, y: 36 }, // 앵커포인트 위치 (중심점 기준)
                scaledSize: { width: 36, height: 36 }, //조절된 크기
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
                // map이 돌면서 하나하나의 storage를 가지고 렌더링할 때, position을 등록시키는 것과 같이
                // 해당하는 storage를 onClick 이벤트 핸들러에 등록시켜둠. 즉 이벤트핸들러가 자신이 생성될때의
                // storage를 기억하고 있으므로, 클릭 시 해당 storage 데이터를 찾아가서 set해주는 것.
                // 각각의 id를 가지고 작업할 때에도, 해당 item당 로직이 생성될 때의 id를 기억하고 있기 때문에
                // 어떠한 함수 실행 시 그 id로 작업할 수 있는 것이다.
                onClick={() => {
                  setSelectedItem(storage);
                  // calculateDistance(storage.longitude, storage.latitude);
                }}
                icon={{
                  url: storage.available === true ? MarkerTrue : MarkerFalse, // 아이콘 이미지 URL
                  anchor: { x: 12, y: 36 }, // 앵커포인트 위치 (중심점 기준)
                  scaledSize: { width: 46, height: 63 }, //조절된 크기
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
// 길 찾기 => 도보만 몇분, 거리 몇km , 경로 표시
// 경로가 지도에 뜨게
// 도보 몇분 거리 몇 km 이거는 Jimventory(가게 정보 컴포넌트)에 뜨게

// const getSearchPosition = async (address) => {
//   try {
//     const response = await axios.get(
//       `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
//         address
//       )}`,
//       {
//         headers: {
//           "X-NCP-APIGW-API-KEY-ID": "aob8hc6abc",
//           "X-NCP-APIGW-API-KEY": "zllmjQhfwpDBGlgTCVzq2BWKtCJttIKItPQ6nbSe",
//         },
//       }
//     );
//     console.log(response);
//     const { x, y } = response.data.addresses[0];
//     const location = { lat: y, lng: x };
//     setCurrentLocation(location);
//   } catch (error) {
//     console.error(error);
//   }
// };
// function calculateDistance(longitude, latitude) {
//   // const [x1, y1] = start;
//   // const [x2, y2] = end;

//     const distance = Math.sqrt(Math.pow(longitude - currentLocation?.lng, 2) + Math.pow(latitude - currentLocation?.lat, 2));
//     console.log(distance, 'distance')
//     return distance;

// }

// const start = [currentLocation?.lng, currentLocation?.lat];
// const end = [selectedItem?.longitude, selectedItem?.latitude];

// const distance = calculateDistance(start, end);
// console.log('두 점 사이의 거리:', distance);
