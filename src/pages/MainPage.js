import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
// import { Polyline } from "react-naver-maps";
import Jimventory from "../components/Jimventory";

import SearchBar from "../components/SearchBar";
import MyLocationIcon from "../image/MyLocation .png";
import MarkerIcon from "../image/MarkerIcon .png";
import UserIcon from "../image/UserIcon.png";
import axios from "axios";

import { getAllStorages } from "../api";

const CurrentLocationButton = styled.button`
  position: absolute;
  padding: 20px;
  border: none;
  border-radius: 50px;
  box-shadow: rgba(84, 84, 85, 0.8) 0px 0px 8px;
  background-image: url(${MyLocationIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 26px 26px;
  background-color: white;
  bottom: 80px;
  right: 10px;
  width: 20px;
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
  const [searchValue, setSearchValue] = useState("");
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
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
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
            "X-Naver-Client-Id": "QW3w2VwojlAzqDun8Ugk", // 검색 api 클라이언트 아이디 , env로 변경할 것
            "X-Naver-Client-Secret": "arriPcMvzT",
          },
        }
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
      const storages = await getAllStorages();
      setStorageData(storages); // 상태 업데이트
      console.log(storages, "dd");
    };
    fetchStorages();
  }, []); // storage가 현재는 몇 개 없지만, 많아질 경우 한번에 불러오는 것은 무리일 듯. 
  // currentLocation 중심으로 범위 지정해서 몇개씩 받아오도록 추후에 수정해야함.
  // 1. 그러면 처음에는 초기 설정된 위치 범위로
  // 2. 사용자 위치 지정하면 그 위치 범위로
  // 3. 주소 검색하면 그 위치 범위로
  // useEffect로 데이터 불러올 시에 의존성 배열에 currentLocation 혹은 현재 위치 값이 담겨야 함. 

  return (
    <MapDiv
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchLocation={onSearchLocation}
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
              onClick={() => {
                setSelectedItem(storage);
                // calculateDistance(storage.longitude, storage.latitude);
              }}
              icon={{
                url: MarkerIcon, // 아이콘 이미지 URL
                anchor: { x: 12, y: 36 }, // 앵커포인트 위치 (중심점 기준)
                scaledSize: { width: 32, height: 32 }, //조절된 크기
              }}
            />
          </div>
        ))}
      </NaverMap>
      <CurrentLocationButton onClick={handleCenterToCurrentLocation} />
    </MapDiv>
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
