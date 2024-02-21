import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SectionBooking from '../components/BookingSection/SectionBooking';
import { useRecoilValue } from 'recoil';
import { sectionState } from '../atoms/setcion';
import SectionInfo from '../components/BookingSection/SectionInfo';
import SectionCompleted from '../components/BookingSection/SectionCompleted';

const Container = styled.div`
  position: relative;
  height: 852px;
`;
function BookingPage() {
  const { id } = useParams();
  const section = useRecoilValue(sectionState);
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/main');
  };

  return (
    <Container>
      {section === 0 && <SectionInfo goToMap={goToMap} id={id} />}
      {section === 1 && <SectionBooking />}
      {section === 2 && <SectionBooking />}
      {section === 3 && <SectionCompleted />}
    </Container>
  );
}

export default BookingPage;
