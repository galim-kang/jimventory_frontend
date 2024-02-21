import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { sectionState } from '../../atoms/setcion';
import PolygonPrev from '../../image/PolygonPrev.png';
import PolygonNext from '../../image/PolygonNext.png';
import CountDown from '../../image/CountDown.png';
import CountUp from '../../image/CountUp.png';
import { useEffect, useState } from 'react';
import { dateState } from '../../atoms/dateInput';
import { format, setMinutes } from 'date-fns';
import { hourState } from '../../atoms/hoursInput';
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
  padding: 33px 38px 220px 38px;
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
  width: ${(props) => props.width};
  height: 53px;
  background-color: #f4f4f4;
  border-radius: 50px;
  margin-bottom: ${(props) => props.marginBottom};
  display: flex;
  justify-content: space-between;
  padding: 0 27px;
  align-items: center;
  border-bottom: ${(props) => props.borderBottom || '0px'};
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
  padding-bottom: 20px;
`;
const SectionBooking = () => {
  const [count, setCount] = useState(1);
  // const [price, setPrice] = useState(0);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState('');
  const [dateValue, setDateValue] = useRecoilState(dateState);
  const [section, setSection] = useRecoilState(sectionState);
  const [hourRecoilState, setHourRecoilState] = useRecoilState(hourState);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalPrice, setTotalPrice] = useState(1200);
  const handleCheckInChange = (event) => {
    const value = event.target.value;
    const formatValue = format(new Date(value), 'yyyy.MM.dd HH:mm');
    // setCheckIn(formatValue.replace('T', '  '));
    setCheckIn(value);
  };
  const addHoursToDateTime = (dateTimeString, hoursToAdd) => {
    // 주어진 문자열을 기반으로 Date 객체를 생성합니다.
    const dateTime = new Date(dateTimeString);

    // 사용자가 입력한 시간을 더합니다.
    dateTime.setHours(dateTime.getHours() + hoursToAdd);

    // 만약 시간이 24:00 이상이라면 날짜를 업데이트하고 시간을 조정합니다.
    if (dateTime.getHours() >= 24) {
      // 다음 날로 넘어감
      dateTime.setDate(dateTime.getDate() + 1);
      // 시간을 24시간으로 조정
      dateTime.setHours(dateTime.getHours() - 24);
    }

    // 날짜 및 시간을 문자열로 변환하여 반환합니다.
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTime.getDate()).slice(-2);
    const hours = ('0' + dateTime.getHours()).slice(-2);
    const minutes = ('0' + dateTime.getMinutes()).slice(-2);

    // return `${year}.${month}.${day} ${hours}:${minutes}`;
    const newDateValue = `${year}.${month}.${day} ${hours}:${minutes}`;
    setCheckOut(newDateValue);
    setMinutes(`${hours}:${minutes}`);
  };

  useEffect(() => {
    if (checkIn) {
      addHoursToDateTime(checkIn, hours);
    }
  }, [checkIn, hours]);

  const nextSection = () => {
    if (section < 3) {
      setSection((prevSection) => prevSection + 1);
    }
    if (section === 1) {
      setHourRecoilState(hours);
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
    return count * defaultCost * hourRecoilState;
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
            style={{
              marginBottom: 15,
              marginTop: 0,
              width: '100%',
              height: 50,
              borderRadius: 50,
              padding: '0 10px',
            }}
            type="datetime-local"
            name="checkIn"
            id="checkIn"
            value={checkIn}
            onChange={handleCheckInChange}
          />
          <CheckText>Operating-hours</CheckText>
          <CountSection width="100%" marginBottom="15px">
            <div
              style={{ height: 33.7 }}
              onClick={() => {
                if (hours > 1) {
                  setHours((prevHours) => prevHours - 1);
                }
              }}
            >
              <CountImage src={CountDown} />
            </div>
            <CountText>{hours}</CountText>
            <div
              style={{ height: 33.7 }}
              onClick={() => setHours((prevHours) => prevHours + 1)}
            >
              <CountImage src={CountUp} />
            </div>
          </CountSection>
          <div
            style={{
              height: 2,
              borderBottom: '2px solid #d9d9d9',
              margin: '20px 0 15px 0',
            }}
          ></div>
          <CheckText>Check-out</CheckText>
          <CountText>{checkOut}</CountText>
          <div>You can check out anytime before {minutes}</div>
        </DateSection>
      )}
      {section === 2 && (
        <>
          <Section>
            <BagMessage>How many bags do you have?</BagMessage>
            <CountSection width="339px" marginBottom="37px">
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
