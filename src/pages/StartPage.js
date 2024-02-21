import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import './StartPage.css';
import Section1BackgroundImage from '../image/section1-image.png';
import OpenYourJimventory from '../components/OpenYourJimventory';
import Frame from '../image/frame.png';
import OriginalLogo from '../image/OriginalLogo.png';
import PhoneLogo from '../image/PhoneImage.png';
import Carrier from '../image/Carrier.png';
import CompleteLogo from '../image/CompleteLogo.png';
import MapPreview from '../image/MapPreview.png';
const StartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(255,255,255); */
  /* background: linear-gradient(#ffffff, #B9E2FF, #0094FF); */
  width: 393px;
  height: 852px;
  border-radius: 35px;
  overflow: hidden;
  position: relative;
  /* box-shadow: inset -12px -12px 16px rgba(154, 50, 50, 0.42), inset 7px 7px 9px rgba(255, 155, 155, 0.7); */
  /* box-shadow: inset -12px -12px 16px rgba(0, 148, 255, 0.7), inset 7px 7px 9px rgba(185, 226, 255, 0.42); */
`;
const SliderContainer = styled.div`
  width: 393px;
  height: 852px;
  color: rgb(223, 225, 226);
  /* background-color: rgb(253, 106, 2); */
`;

const Section = styled.section`
  padding-top: 115px;
  width: 393px;
  height: 852px;
  /* background-image: ${(props) => props.background || 'none'};
background-position : center;
background-repeat: no-repeat;
background-size: cover; */
`;
const StartLink = styled(Link)`
  position: absolute;
  bottom: 48px;
  font-size: 36px;
  font-family: 'Inter';
  color: rgb(0, 163, 255);
  text-decoration: none;
  width: 300px;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 67px; /* height 값과 동일하게 설정 */
  background-color: rgb(255, 255, 255);
  border-radius: 50px;
`;
const Logo = styled.img`
  position: absolute;
  top: 155px;
  width: 393px;
  height: 615px;
`;
const Phone = styled.img`
  width: 290px;
  height: 577px;
  margin-left: 52px;
  margin-top: 10px;
`;
const Title = styled.span`
  font-family: 'Inter';
  font-size: 46px;
  border-bottom: 3px solid rgb(223, 225, 226);
`;
const ContentDiv = styled.div`
  font-family: 'Inter Bold';
  font-size: 26px;
  color: ${(props) => props.color || 'white'};
`;
const ContentSpan = styled.span`
  font-family: 'Inter Bold';
  font-size: 26px;
  color: ${(props) => props.color || 'white'};
`;
const ContentContainer = styled.div`
  position: absolute;
  padding: 34px 27px;
  height: 287px;
  width: 393px;
  bottom: 0;
  background-color: rgb(0, 148, 255);
`;
const CarrierImage = styled.img`
  width: 333px;
  height: 560px;
  margin-left: 12px;
`;
const Complete = styled.img`
  width: 350px;
  height: 350px;
  margin-left: 40px;
  margin-top: 80px;
`;
const MapImage = styled.img`
  width: 393px;
  height: 852px;
  position: absolute;
  top: 0;
`;
function StartPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StartPageContainer frame={Frame}>
      <SliderContainer>
        <Slider {...settings}>
          <Section>
            <OpenYourJimventory />
            <Logo src={OriginalLogo} />
            <ContentContainer>
              <ContentDiv>the easiest way to store</ContentDiv>
              <ContentDiv>your luggage</ContentDiv>
            </ContentContainer>
          </Section>
          <Section>
            <MapImage src={MapPreview} />
            {/* <Title>STEP.1</Title> */}
            {/* <OpenYourJimventory /> */}
            <ContentContainer>
              <ContentSpan>Find </ContentSpan>
              <ContentSpan color="black">Jimventory </ContentSpan>
              <ContentSpan>near you</ContentSpan>
            </ContentContainer>
          </Section>
          <Section>
            {/* <OpenYourJimventory /> */}
            <Phone src={PhoneLogo} />
            <ContentContainer>
              <ContentSpan>Book </ContentSpan>
              <ContentSpan color="black">Jimventory</ContentSpan>
              <ContentDiv>quickly and easily</ContentDiv>
            </ContentContainer>
          </Section>
          <Section>
            <CarrierImage src={Carrier} />
            {/* <OpenYourJimventory /> */}
            <ContentContainer>
              <ContentDiv>Drop off your</ContentDiv>
              <ContentDiv>luggage securely</ContentDiv>
            </ContentContainer>
          </Section>
          <Section>
            {/* <OpenYourJimventory /> */}
            <Complete src={CompleteLogo} />
            <ContentContainer>
              <ContentDiv>Enjoy your adventure</ContentDiv>
              <ContentDiv>hassle-free!</ContentDiv>
            </ContentContainer>
          </Section>
        </Slider>
      </SliderContainer>
      {/* <h1>
        open your
        <br /> JIMVENTORY
      </h1> */}

      <StartLink to="/main">START</StartLink>
    </StartPageContainer>
  );
}

export default StartPage;
