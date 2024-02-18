export const dummyStorages = [
  {
    address: '서울 성동구 성수동2가 289-290',
    available: true, // 현재 이용 가능한지 여부
    contact_info: '010-9160-2600', // 가게 연락처
    description: ['2f', 'no-elevator', 'wheelchair-friendly'],
    hostUser: 'galim',
    id: 1, // id???
    image: '', // url 주소, mvp에서는 양이 많지 않으므로 직접 주소를 넣지만 추후 프론트단에서 aws등 이용하여 이미지 넣고 주소 받아오는 식으로 해결하기
    // 그리고 jimventory컴포넌트에서는 한 개만 필요하지만 가게 정보 표시하는 곳에서 여러장 필요할 경우 객체로 받아야 함.
    introduction: '아주 작고 귀여운 카페입니다',
    latitude: 37.547797,
    longitude: 127.053585,
    serviceName: 'Jimcafe',
    storeType: 'cafe',
    operatingTime: {
      start: '10:00',
      end: '23:00',
    },
    walk: '4 min',
  },
  {
    address: '서울 중구 명동2가 1-8',
    available: false, // 현재 이용 가능한지 여부
    contact_info: '010-9160-2600', // 가게 연락처
    description: ['2f', 'no-elevator', 'wheelchair-friendly'],
    hostUser: 'god',
    id: 2, // id???
    image: '', // url 주소, mvp에서는 양이 많지 않으므로 직접 주소를 넣지만 추후 프론트단에서 aws등 이용하여 이미지 넣고 주소 받아오는 식으로 해결하기
    // 그리고 jimventory컴포넌트에서는 한 개만 필요하지만 가게 정보 표시하는 곳에서 여러장 필요할 경우 객체로 받아야 함.
    introduction: '명동에 위치한 명동 성당입니다',
    latitude: 37.563415,
    longitude: 126.987371,
    serviceName: 'Myengdong Cathedral',
    storeType: 'cathedral',
    operatingTime: {
      start: '10:00',
      end: '23:00',
    },
    walk: '7 min',
  },
];
