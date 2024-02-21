import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sectionState } from '../../atoms/setcion';
import styled, { css } from 'styled-components';
import { dummyStorages } from '../../dummyData/getAllStorages';
import PolygonDown from '../../image/PolygonDown.png';
import PolygonUp from '../../image/PolygonUp.png';
import MenuSection from './MenuSection';
import CancelLogo from '../../image/CancelX.png';
// const Container = styled.div`
//   position: relative;
//   width: 393px;
//   height: 100%;
// `;
const Reserve = styled.button`
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
  position: fixed;
  top: 765px;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* ${(props) =>
    props.isScrolled &&
    css`
      width: 393px;
      height: 240px;
      border-top: 1px solid black;
    `} */
`;
const StorageImage = styled.img`
  /* position: absolute;
  top: -9px;
  left: -18px; */
  width: 432px;
  height: 569px;
`;
const Address = styled.div`
  padding-top: 14px;
  padding-bottom: 15px;
  font-size: 13px;
  color: #bfbfbf;
  font-family: 'Inter Regular';
`;
const Title = styled.span`
  font-family: 'Inter ExtraBold';
  color: #000000;
  font-size: 30px;
  margin-right: 3px;
`;
const StoreType = styled.span`
  color: #7c7c7c;
  font-size: 14px;
  font-family: 'Inter SemiBold';
`;
const OperatingTime = styled.div`
  display: flex;
  justify-content: center;
  width: 333px;
  padding: 10px 0 20px 0;
  margin: 0 30px;
  color: #bbb5b5;
  font-family: 'Inter Medium';
  font-size: 15px;
  border-bottom: 2px solid #d9d9d9;
`;
const Description = styled.div`
  width: 333px;
  padding: 20px 16px;
  margin: 0 30px;
  border-bottom: 2px solid #d9d9d9;
`;
const Refund = styled.div`
  width: 333px;
  padding: 20px 16px;
  margin: 0 30px;

  ${(props) =>
    props.isMenuOpen &&
    css`
      border-bottom: 2px solid #d9d9d9;
    `}
`;
const AddSection = styled.div`
  padding-top: 23px;
  width: 393px;
  height: 207px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.5);
  ${(props) =>
    props.isMenuOpen &&
    css`
      position: absolute;
      bottom: 0;
      background-color: #ffffff;
    `}
`;

const AddText = styled.div`
  color: #0094ff;
  font-size: 18px;
  font-family: 'Inter Bold';
  line-height: 22px;
`;
const DesTitle = styled.div`
  padding-bottom: 12px;
  font-family: 'Inter Bold';
  font-size: 18px;
  color: #1c1e1c;
`;

const DescriptionList = styled.li`
  font-family: 'Inter Regular';
  font-size: 15px;
  padding: 3px 0;
  color: #7c7c7c;
`;
const Polygon = styled.div`
  background-image: url(${(props) => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;
  width: 23px;
  height: 23px;
`;
const XButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 900;
`;
const SectionInfo = ({ id, goToMap }) => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [section, setSection] = useRecoilState(sectionState);
  const scrollContainerRef = useRef(null);
  const menuRef = useRef();
  useEffect(() => {
    // 스크롤 이벤트 핸들러 함수
    const handleScroll = () => {
      // 현재 스크롤 위치를 콘솔에 출력
      console.log(scrollContainerRef.current?.scrollTop);
      const scrollTop = scrollContainerRef.current?.scrollTop;
      // if (isMenuOpen) {
      //   scrollContainerRef.current.scrollTop = 852;
      // }
    };

    // 스크롤 컨테이너에 이벤트 리스너 추가
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMenuOpen]);
  useEffect(() => {
    if (menuRef && isMenuOpen) {
      console.log(menuRef.current);
      menuRef.current?.scrollIntoView({ top: 50, behavior: 'smooth' });
    }
  }, [isMenuOpen]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // if (scrollContainerRef.current) {
    //   scrollContainerRef.current.scrollTop = 852;
    // }
  };
  const dummyData = dummyStorages.filter((it) => it.id == id);
  console.log(dummyData);
  const nextSection = () => {
    if (section < 3) {
      setSection((prevSection) => prevSection + 1);
    }
  };

  const { description, image, operatingTime, address, serviceName, storeType } =
    dummyData[0];
  return (
    <div ref={scrollContainerRef} style={{ overflow: 'scroll', height: 852 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {section === 0 && (
          <div onClick={goToMap}>
            <XButton src={CancelLogo} />
          </div>
        )}
        <StorageImage src={image} />
        <Address>{address}</Address>
        <div>
          <Title>{serviceName}</Title>
          <StoreType>{storeType}</StoreType>
        </div>
        <OperatingTime>
          <div>
            {operatingTime.start} - {operatingTime.end}
          </div>
        </OperatingTime>
        <Description>
          <DesTitle>Facility</DesTitle>
          <ul style={{ marginLeft: 15 }}>
            {description.map((it) => (
              <DescriptionList>{it}</DescriptionList>
            ))}
          </ul>
        </Description>
        <Refund isMenuOpen={isMenuOpen}>
          <DesTitle>Refund policy</DesTitle>
          <ul style={{ marginLeft: 15 }}>
            <DescriptionList>100%</DescriptionList>
          </ul>
        </Refund>
        {!isMenuOpen ? (
          <AddSection>
            <AddText>Take a look this area</AddText>
            <Polygon icon={PolygonDown} onClick={toggleMenu}>
              {/* <Polygon src={PolygonDown} /> */}
            </Polygon>
          </AddSection>
        ) : (
          <MenuSection ref={menuRef} />
        )}
        {isMenuOpen && (
          <AddSection isMenuOpen={isMenuOpen}>
            <AddText>It's okay if you don't look around</AddText>
            <Polygon icon={PolygonUp} onClick={toggleMenu}></Polygon>
          </AddSection>
        )}
        <ButtonSection>
          <Reserve onClick={nextSection}>Reserve</Reserve>
        </ButtonSection>
      </div>
    </div>
  );
};

export default SectionInfo;
