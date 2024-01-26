import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createReservation, getStorageDetails } from "../api";
import styles from "./BookingPage.module.css";

function BookingPage() {
  const { id } = useParams();

  const [storageDetails, setStorageDetails] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: "",
    bags: 1,
  });
  const [section, setSection] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const fetchStorageDetails = async () => {
      const data = await getStorageDetails(id);
      setStorageDetails(data);
      console.log(data, 'bookingPage storage data'); // return response.data 해서 받아온 데이터 .
      console.log(id, "id");
    };
    fetchStorageDetails();
  }, [id]);

  const handleInputChange = (event) => {
    setBookingInfo({
      ...bookingInfo,
      [event.target.name]: event.target.value,
    });
  }; // 입력받은 체크인 데이터 저장

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
      console.log("Reservation successful:", response);
    } else {
      console.error("Reservation failed");
    }
  };

  const nextSection = () => {
    if (section < 3) {
      setSection(section + 1);
    }
  };

  const prevSection = () => {
    if (section > 0) {
      setSection(section - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionIndicator}>Section {section + 1}</h3>
      {section === 0 && storageDetails && (
        // section 0 , 가게 정보 받아와서 뿌려주는 곳
        <section>
          <p className={styles.description}>{storageDetails.storeType}</p>
          <h1 className={styles.title}>{storageDetails.serviceName}</h1>
          <b className={styles.description}>{storageDetails.address}</b>
          <p>{storageDetails.contact_info}</p>
          {storageDetails.description &&
            storageDetails.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          <p>{storageDetails.introduction}</p>
          <p className={styles.time}>
            Operating Time: {storageDetails.operatingTime[0]} -{" "}
            {storageDetails.operatingTime[1]}
          </p>
          <p>tel: 02-123-4567</p>
          <button className={styles.moveButton} onClick={nextSection}>
            Next
          </button>
        </section>
      )}
      {section === 1 && (
        <section>
          <div className={styles.illustration}></div>
          <div>Check-in Date and Time</div>
          <input
            type="datetime-local"
            name="checkIn"
            value={bookingInfo.checkIn}
            onChange={handleInputChange}
          />
          <div>
            <button className={styles.moveButton} onClick={prevSection}>
              Prev
            </button>
            <button className={styles.moveButton} onClick={nextSection}>
              Next
            </button>
          </div>
        </section>
      )}
      {section === 2 && (
        <section>
          <div className={styles.illustration}></div>
          <div className={styles.bagsContainer}>
            <div>Bags</div>
            <div>Suitcase, backpack, shopping bag</div>
            <div className={styles.bagsControl}>
              <button onClick={handleDecrease}>-</button>
              <div>{bookingInfo.bags}</div>
              <button onClick={handleIncrease}>+</button>
            </div>
          </div>
          <p>Price per hour: ₩ {calculateTotal()}</p>
          <caption>
            Price will be calculated per 10min, price per 10min = ₩50
          </caption>
          <div>
            <button className={styles.moveButton} onClick={prevSection}>
              Prev
            </button>
            <button
              className={styles.bookingButton}
              onClick={() => {
                handleBooking();
                nextSection();
              }}
            >
              Book now
            </button>
          </div>
        </section>
      )}
      {section === 3 && (
        <section>
          <div className={styles.illustration}></div>
          <h1>Enjoy your hands-free journey!</h1>
          <button className={styles.moveButton} onClick={prevSection}>
            Prev
          </button>
          <h1>짐 맡길 가게 둘러보기 ▼ </h1>
        </section>
      )}
    </div>
  );
}

export default BookingPage;
