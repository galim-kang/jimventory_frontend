import styled from 'styled-components';
import MenuImage from '../../image/MenuImage.png';
const menuDescription = [
  'A delicious blend of Latin',
  'American and Asia/Pacific',
  'coffees, this espresso has a rich',
  'and caramelly sweetness',
];
const Menu = styled.div`
  padding-top: 52px;
  padding-bottom: 40px;
  font-size: 24px;
  line-height: 29px;
  font-family: 'Inter Bold';
  color: #1c1e1c;
`;
const Image = styled.img`
  margin-right: 14px;
  width: 120px;
  height: 163px;
`;
const Title = styled.div`
  color: #585858;
  font-size: 20px;
  font-family: 'Inter SemiBold';
`;
const Description = styled.div`
  color: #8e8e8e;
  font-size: 12px;
  font-family: 'Inter Regular';
`;

const MenuBoard = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'start', paddingBottom: 56 }}
    >
      <Image src={MenuImage} />

      <div>
        <Title>espresso</Title>
        {menuDescription.map((it, index) => (
          <Description key={index}>{it}</Description>
        ))}
      </div>
    </div>
  );
};
const MenuSection = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Menu>Menu</Menu>
      <MenuBoard />
      <MenuBoard />
      <MenuBoard />
      <MenuBoard />
    </div>
  );
};

export default MenuSection;
