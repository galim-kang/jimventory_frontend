import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservation, getStorageDetails } from '../api';
import styles from './BookingPage.module.css';
import styled from 'styled-components';
import SectionBooking from '../components/BookingSection/SectionBooking';
import { useRecoilValue } from 'recoil';
import { sectionState } from '../atoms/setcion';
import SectionInfo from '../components/BookingSection/SectionInfo';
import SectionCompleted from '../components/BookingSection/SectionCompleted';

function BookingPage() {
  const { id } = useParams();
  const section = useRecoilValue(sectionState);
  const [storageDetails, setStorageDetails] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: '',
    bags: 1,
  });
  // const [section, setSection] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStorageDetails = async () => {
      const data = await getStorageDetails(id);
      setStorageDetails(data);
      console.log(data, 'bookingPage storage data'); // return response.data 해서 받아온 데이터 .
      console.log(id, 'id');
    };
    fetchStorageDetails();
  }, [id]);

  //날짜 데이터
  const handleInputChange = (event) => {
    setBookingInfo({
      ...bookingInfo,
      [event.target.name]: event.target.value,
    });
  }; // 입력받은 체크인 데이터 저장

  //가방 섹션
  const handleIncrease = () => {
    setBookingInfo({ ...bookingInfo, bags: bookingInfo.bags + 1 });
  };

  const handleDecrease = () => {
    if (bookingInfo.bags > 1) {
      setBookingInfo({ ...bookingInfo, bags: bookingInfo.bags - 1 });
    }
  };

  const calculateTotal = () => {
    const bagCost = 3000;
    return bagCost * bookingInfo.bags;
  };

  //예약하기
  const handleBooking = async () => {
    // 예약 생성을 위한 데이터
    const reservationData = {
      storage: id, // storage ID
      check_in: bookingInfo.checkIn, // check-in date and time
      bag_count: bookingInfo.bags, // number of bags
      // 필요한 경우 추가적인 데이터를 여기에 포함
    };

    // API 요청을 통해 예약 생성
    const response = await createReservation(reservationData);
    if (response) {
      console.log('Reservation successful:', response);
    } else {
      console.error('Reservation failed');
    }
  };
  const goToMap = () => {
    navigate('/main');
  };
  // const nextSection = () => {
  //   if (section < 3) {
  //     setSection(section + 1);
  //   }
  // };

  // const prevSection = () => {
  //   if (section > 0) {
  //     setSection(section - 1);
  //   }
  // };

  return (
    <div className={styles.container}>
      {/* <h3 className={styles.sectionIndicator}>Section {section + 1}</h3> */}

      {section === 0 && storageDetails && (
        <SectionInfo goToMap={goToMap} id={id} />
      )}
      {section === 1 && (
        <SectionBooking />
        // <section>
        //   <div>Check-in Date and Time</div>
        //   <input
        //     type="datetime-local"
        //     name="checkIn"
        //     value={bookingInfo.checkIn}
        //     onChange={handleInputChange}
        //   />
        //   <div>
        //     <button className={styles.moveButton} onClick={prevSection}>
        //       Prev
        //     </button>
        //     <button className={styles.moveButton} onClick={nextSection}>
        //       Next
        //     </button>
        //   </div>
        // </section>
      )}
      {section === 2 && (
        <SectionBooking />
        // <section>
        //   <div className={styles.bagsContainer}>
        //     <TitleSection>
        //       <Title>How many bags</Title>
        //       <Title>are you dropping off</Title>
        //     </TitleSection>
        //     <div>Suitcase, backpack, shopping bag</div>
        //     <div className={styles.bagsControl}>
        //       <button onClick={handleDecrease}>-</button>
        //       <div>{bookingInfo.bags}</div>
        //       <button onClick={handleIncrease}>+</button>
        //     </div>
        //   </div>
        //   <p>Price per hour: ₩ {calculateTotal()}</p>
        //   <div>Price will be calculated per 10min, price per 10min = ₩50</div>
        //   <div>
        //     <button className={styles.moveButton} onClick={prevSection}>
        //       Prev
        //     </button>
        //     <button
        //       className={styles.bookingButton}
        //       onClick={() => {
        //         handleBooking();
        //         nextSection();
        //       }}
        //     >
        //       Book now
        //     </button>
        //   </div>
        // </section>
      )}
      {section === 3 && <SectionCompleted />}
    </div>
  );
}

export default BookingPage;
