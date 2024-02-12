import Menu from "./components/Menu";

const Layout = ({ children }) => {
  return (
    <div className="layout" style={{height : 852, position : 'relative', overflow : 'hidden', borderRadius : 35}}>
      {children}
      <Menu />
    </div>
  );
};

export default Layout;
