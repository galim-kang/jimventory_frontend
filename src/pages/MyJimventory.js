import React, { useState, useEffect } from 'react';
import { dummyReservations } from '../dummyData/getReservations';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  padding: 38px 17px 0 17px;
  /* margin-top: 60px; */
  position: relative;
  width: 393px;
  height: 852px;
  background-color: #0094ff;
`;
const Ticket = styled.div`
  margin-top: 107px;
  background-color: #ffffff;
  width: 360px;
  height: 489px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const MyBookings = styled.div`
  font-family: 'Inter Bold';
  font-size: 30px;
  color: #ffffff;
`;
const TitleSection = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
const Title = styled.div`
  font-size: 24px;
  font-family: 'Inter ExtraBold';
  margin-right: 7px;
`;
const StoreType = styled.div`
  line-height: 24px;
  font-size: 14px;
  font-family: 'Inter SemiBold';
  color: #878787;
`;
const Description = styled.span`
  font-size: 12px;
  font-family: 'Inter Regular';
  color: #a6a6a6;
  margin-bottom: 40px;
`;
const CheckSection = styled.div`
  margin-top: 40px;
  padding: 0 36px;
`;
const TextStyle = styled.div`
  color: #a6a6a6;
  font-size: 14px;
  font-family: 'Inter SemiBold';
`;
const NumStyle = styled.div`
  color: #4a4a4a;
  font-size: 24px;
  font-family: 'Inter ExtraBold';
`;
const CheckText = styled(TextStyle)`
  margin-bottom: 10px;
`;
const CheckDate = styled(NumStyle)`
  margin-bottom: 20px;
`;
const Bag = styled(TextStyle)`
  margin-bottom: 10px;
`;
const BagCount = styled(NumStyle)`
  margin-bottom: 80px;
`;
const TotalPrice = styled(TextStyle)`
  margin-bottom: 15px;
`;
const PriceNum = styled.div`
  color: #4a4a4a;
  font-size: 26px;
  font-family: 'Inter ExtraBold';
  margin-left: 152px;
`;
const MyJimventory = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    setBookings(dummyReservations);
    // console.log(dummyReservations, 'dummyReservations');
  }, []);

  const { check_in, check_out, storage, bag_count, price } = dummyReservations;
  return (
    <Container>
      <MyBookings>My Jimventory</MyBookings>
      <Ticket>
        <TitleSection>
          <Title>{storage.title}</Title>
          <StoreType>{storage.storeType}</StoreType>
        </TitleSection>
        <div style={{ display: 'flex', justifyContent: 'center', height: 15 }}>
          {storage.description.map((item, index) => (
            <>
              <Description key={index}>{item}</Description>
              {index !== 2 && <Description>, </Description>}
            </>
          ))}
        </div>
        <CheckSection>
          <CheckText>Check-in</CheckText>
          <CheckDate>{check_in}</CheckDate>
          <CheckText>Check-out</CheckText>
          <CheckDate>{check_out}</CheckDate>
          <Bag>Bag</Bag>
          <BagCount>1</BagCount>
          <TotalPrice>Total price</TotalPrice>
          <PriceNum>8000 won</PriceNum>
        </CheckSection>
      </Ticket>
    </Container>
  );
};

export default MyJimventory;

// 승인 대기 => 예약 취소버튼
// 승인 확정 => 아직 예약한 시간이 안됨 => 예약취소 버튼
// 사용중 => 상세페이지로 들어갔을 때 현재 누적 시간 표시
// 사용완료 -> 기록에서 찾을 수 있게 따로 버튼 등으로 빼기
// 승인 취소 (거절당한 거) => 이유를 알 수 있게 표시해주기
// 하나의 예약 정보 클릭하면 예약 상세페이지로 넘어갈 수 있도록 하기

// 예약 상세페이지 만들어야 함.
