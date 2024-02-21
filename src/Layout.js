import Menu from './components/Menu';
import styled from 'styled-components';

const Container = styled.div`
  height: 852px;
  position: relative;
  overflow: scroll;
  border-radius: 35px;

  /* Chrome, Safari */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;

  /* Internet Explorer */
  -ms-overflow-style: none;
`;
const Layout = ({ children, menu }) => {
  return (
    <Container className="layout">
      {children}
      {menu && menu === 'true' && <Menu />}
    </Container>
  );
};

export default Layout;
