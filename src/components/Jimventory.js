import styled, { keyframes } from 'styled-components';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JimCafe from '../image/JimCafe.png';
import Walk from '../image/Walk.png';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 272px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  /* padding: 20px; */
  padding-top: 42.5px;
  padding-bottom: 44px;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease;
  z-index: 10;
`;
const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  align-items: space-between;
`;
const Icon = styled.img`
  width: 85px;
  height: 85px;
  /* background-color: rgb(223, 225, 226); */
  border-radius: 50%;
  flex-shrink: 0;
`;
const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3px;
`;
const Title = styled.div`
  font-family: 'Inter ExtraBold';
  font-size: 24px;
  color: #000000;
  margin-right: 6px;
`;
const StoreType = styled.div`
  font-family: 'Inter SemiBold';
  font-size: 14px;
  color: #878787;
`;
const Description = styled.div`
  color: #a6a6a6;
  font-size: 12px;
  font-family: 'Inter Regular';
  text-align: center;
`;
const OperatingTime = styled.div`
  color: #a1a1a1;
  font-size: 20px;
  font-family: 'Inter SemiBold';
  margin-right: 34px;
`;
const WalkTime = styled.div`
  color: #a1a1a1;
  font-size: 20px;
  font-family: 'Inter SemiBold';
`;

// const BookNow = styled(Link)` => Link 태그 확장
const BookNow = styled.button`
  all: unset;
  font-family: 'Inter';
  display: inline-block;
  width: 339px;
  height: 53px;
  /* padding: 8px 0; */
  border-radius: 50px;
  cursor: pointer;
  background-color: #0094ff;
  color: #ffffff;
  font-size: 32px;
  text-align: center;
`;
const ImgWrapper = styled.div`
  position: absolute;
  top: -42.5px;
`;
const TimeSection = styled.div`
  display: flex;
  padding: 24px 0;
  justify-content: center;
  align-items: center;
`;

const Jimventory = ({ selectedItem, setSelectedItem }) => {
  const containerRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(selectedItem, 'selectedItem');
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSelectedItem(null);
      }
    }; // 짐벤토리 외부영역 클릭했을 시 이벤트 감지, selectedItem 없는걸로 간주하고 null로 비워버리기

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedItem, setSelectedItem]);

  if (!selectedItem) return null; // selectedItem 없으면 짐벤토리 컴포넌트 띄우지 않기

  const { walk, operatingTime, serviceName, storeType, description } =
    selectedItem;

  return (
    <Container ref={containerRef}>
      <ImgWrapper>
        <Icon src={JimCafe} />
      </ImgWrapper>
      <Wrapper>
        <TitleSection>
          <Title>{serviceName} </Title>
          <StoreType>{storeType}</StoreType>
        </TitleSection>
        <div>
          <Description>
            {description.map((item) => (
              <span>{item} </span>
            ))}
          </Description>
        </div>
        <TimeSection>
          <OperatingTime>
            {/* {operatingTime[0]} - {operatingTime[1]} */}
            {operatingTime.start} - {operatingTime.end}
          </OperatingTime>
          <div style={{ display: 'flex' }}>
            <img style={{ width: 12, height: 19 }} src={Walk}></img>
            <WalkTime>{walk}</WalkTime>
          </div>
        </TimeSection>
        <div></div>
      </Wrapper>

      <BookNow onClick={() => navigate(`/booking/${selectedItem.id}`)}>
        Book now
      </BookNow>
    </Container>
  );
};

export default Jimventory;
