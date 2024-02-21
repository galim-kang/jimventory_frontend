import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { sectionState } from '../../atoms/setcion';
import PolygonPrev from '../../image/PolygonPrev.png';
import PolygonNext from '../../image/PolygonNext.png';
import CountDown from '../../image/CountDown.png';
import CountUp from '../../image/CountUp.png';
import { useState } from 'react';
import { dateState } from '../../atoms/dateInput';
const BlackFont = styled.div`
  color: #1c1e1c;
  font-family: 'Inter Bold';
`;
const Title = styled(BlackFont)`
  font-size: 30px;
`;
const TitleSection = styled.div`
  height: 182px;
  background-color: #0094ff;
  padding: 49px 38px;
`;
const DateSection = styled.div`
  padding: 33px 38px 336px 38px;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 27px;
`;
const Button = styled.div`
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 37px;
  height: 37px;
`;
const Section = styled.div`
  padding-top: 33px;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 27px;
  > *:last-child {
    align-self: flex-end;
  }
`;
const BagMessage = styled(BlackFont)`
  margin-bottom: 17px;
  margin-left: 11px;
  font-size: 18px;
`;
const CountSection = styled.div`
  width: 339px;
  height: 53px;
  background-color: #f4f4f4;
  border-radius: 50px;
  margin-bottom: 37px;
  display: flex;
  justify-content: space-between;
  padding: 0 27px;
  align-items: center;
`;
const TotalPrice = styled(BlackFont)`
  font-size: 18px;
  margin-left: 11px;
`;
const Price = styled.span`
  margin-right: 10px;

  color: #0094ff;
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily};
`;
const CountImage = styled.img`
  width: 33.7px;
  height: 33.7px;
`;
const CountText = styled.div`
  color: #000000;
  font-family: 'Inter ExtraBold';
  font-size: 32px;
`;
const CheckText = styled.div`
  color: #1c1e1c;
  font-size: 18px;
  font-family: 'Inter Bold';
  padding-bottom: 10px;
`;
const SectionBooking = () => {
  const [count, setCount] = useState(1);
  // const [price, setPrice] = useState(0);
  const [dateValue, setDateValue] = useRecoilState(dateState);
  const [section, setSection] = useRecoilState(sectionState);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleCheckInChange = (event) => {
    const value = event.target.value;
    setCheckIn(value);
    const minutes = value.slice(14, 16);
    setCheckOut((prevValue) => {
      const checkOutTime =
        prevValue.slice(0, 14) + minutes + prevValue.slice(16);
      return checkOutTime;
    });
  };

  const handleCheckOutChange = (event) => {
    const value = event.target.value;
    setCheckOut(value);
  };

  const handleMinuteChange = (event) => {
    // 분 변경을 막음
    event.preventDefault();
  };
  const nextSection = () => {
    if (section < 3) {
      setSection((prevSection) => prevSection + 1);
    }
  };

  const prevSection = () => {
    if (section > 0) {
      setSection((prevSection) => prevSection - 1);
    }
  };
  const handleCountDown = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };
  const handleCountUp = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const calculateTotal = () => {
    const defaultCost = 1200;
    return count * defaultCost * dateValue;
  };
  return (
    <div>
      <TitleSection>
        <Title>How many bags</Title>
        <Title>are you dropping off</Title>
      </TitleSection>
      {section === 1 && (
        <DateSection>
          <CheckText>Check-in</CheckText>
          <input
            style={{ marginBottom: 15, width: '100%', borderRadius: 20 }}
            type="datetime-local"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={handleCheckInChange}
            //  value={bookingInfo.checkIn}
            // onChange={handleInputChange}
          />
          <CheckText>Check-in</CheckText>
          <input
            style={{ width: '100%', borderRadius: 20 }}
            type="datetime-local"
            name="checkIn"
            id="checkOut"
            value={checkOut}
            onChange={handleCheckOutChange}
            onFocus={handleMinuteChange}
            //  value={bookingInfo.checkIn}
            // onChange={handleInputChange}
          />
        </DateSection>
      )}
      {section === 2 && (
        <>
          <Section>
            <BagMessage>How many bags do you have?</BagMessage>
            <CountSection>
              <div style={{ height: 33.7 }} onClick={handleCountDown}>
                <CountImage src={CountDown} />
              </div>
              <CountText>{count}</CountText>
              <div style={{ height: 33.7 }} onClick={handleCountUp}>
                <CountImage src={CountUp} />
              </div>
            </CountSection>

            <TotalPrice>Total price</TotalPrice>
            <div style={{ marginRight: 27, paddingBottom: 331 }}>
              <Price fontSize={'32px'} fontFamily={'Inter ExtraBold'}>
                {calculateTotal()}
              </Price>
              <Price fontSize={'20px'} fontFamily={'Inter ExtraBold'}>
                won
              </Price>
            </div>
          </Section>
        </>
      )}
      <ButtonSection>
        <Button icon={PolygonPrev} onClick={prevSection}></Button>
        <Button icon={PolygonNext} onClick={nextSection}></Button>
      </ButtonSection>
    </div>
  );
};

export default SectionBooking;
