import Menu from './components/Menu';

const Layout = ({ children, menu }) => {
  return (
    <div
      className="layout"
      style={{
        height: 852,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 35,
      }}
    >
      {children}
      {menu && menu === 'true' && <Menu />}
    </div>
  );
};

export default Layout;
