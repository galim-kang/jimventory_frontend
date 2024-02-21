import CompleteLogo from '../../image/CompleteLogo.png';
import styled from 'styled-components';
import PolygonNext from '../../image/PolygonNext.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { sectionState } from '../../atoms/setcion';
const Img = styled.img`
  /* position: absolute;
  top: 153; */
  margin-top: 153px;
  margin-left: 21px;
  width: 387px;
  height: 387px;
`;

const User = styled.div`
  position: absolute;
  top: 452px;
  font-size: 42px;
  color: #1c1e1c;
  font-family: 'Inter ExtraBold';
`;
const MessageSection = styled.div`
  position: absolute;
  top: 512px;
  font-size: 20px;
  font-family: 'Inter Bold';
  color: #8c8c8c;
  line-height: 30px;
`;
const GoToJimventory = styled.div`
  position: absolute;
  bottom: 0;
  height: 140px;
  width: 393px;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  border-bottom: 0px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Polygon = styled.img`
  width: 37px;
  height: 37px;
`;
const BlueMessageSection = styled.div`
  color: #0094ff;
  font-family: 'Inter ExtraBold';
  font-size: 20px;
  margin-right: 50px;
`;
const SectionCompleted = () => {
  const [section, setSection] = useRecoilState(sectionState);

  const navigate = useNavigate();
  const goToJimventory = () => {
    navigate('/my-jimventory');
    setSection(0);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Img src={CompleteLogo} />
      <User>Galim Kang!</User>
      <MessageSection>
        <div>Enjoy your adventure </div>
        <div>hassle-free!</div>
      </MessageSection>
      <GoToJimventory>
        <BlueMessageSection>
          <div>Take a loot at</div>
          <div>your Jimventory</div>
        </BlueMessageSection>
        <div onClick={goToJimventory}>
          <Polygon src={PolygonNext} />
        </div>
      </GoToJimventory>
    </div>
  );
};

export default SectionCompleted;
