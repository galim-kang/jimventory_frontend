import styled, { keyframes } from 'styled-components';
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const WhiteInter = styled.div`
  font-family: 'Inter';
  color: rgb(223, 225, 226);
  font-size: ${(props) => props.fontSize || '18px'};
`;
const WhiteInterMedium = styled.div`
  font-family: 'Inter Medium';
  color: rgb(223, 225, 226);
  font-size: ${(props) => props.fontSize || '18px'};
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
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(255, 55, 55);
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 1s ease;
  z-index: 10;
`;
const Wrapper = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;
const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgb(223, 225, 226);
  border-radius: 50%;
  flex-shrink: 0;
`;
const Title = styled(WhiteInter)``;
const StoreType = styled(WhiteInterMedium)``;
const Description = styled(WhiteInterMedium)``;
const OperatingTime = styled(WhiteInter)``;
// const BookNow = styled(Link)` => Link 태그 확장
const BookNow = styled.button`
  all: unset;
  font-family: 'Inter';
  display: inline-block;
  margin-top: 10px;
  width: 300px;
  height: 67px;
  /* padding: 8px 0; */
  border-radius: 50px;
  cursor: pointer;
  background-color: rgb(223, 225, 226);
  color: rgb(255, 55, 55);
  font-size: 36px;
  text-align: center;
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

  const { operatingTime, serviceName, storeType, introduction, description } =
    selectedItem;

  return (
    <Container ref={containerRef}>
      <Wrapper>
        <div>
          <StoreType fontSize="16px">{storeType}</StoreType>
          <Title fontSize="30px">{serviceName}</Title>
          <OperatingTime fontSize="20px">
            {/* {operatingTime[0]} - {operatingTime[1]} */}
            {operatingTime.start} - {operatingTime.end}
          </OperatingTime>
          <Description fontSize="15px">
            {description.map((item) => (
              <span>{item} </span>
            ))}
          </Description>
        </div>
        <Icon />
      </Wrapper>

      <BookNow onClick={() => navigate(`/booking/${selectedItem.id}`)}>
        Book Now!
      </BookNow>
    </Container>
  );
};

export default Jimventory;
