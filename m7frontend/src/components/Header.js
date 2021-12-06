import logo from "../assets/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-top">
        <img src={logo} className="header-logo" />
        <p>
          Login or <button className="header-btn header-login-btn">Sign up</button>
        </p>
      </div>
      <div className="header-navbar">
        <button className="header-btn header-nav-btn">Property Management</button>
        <button className="header-btn header-nav-btn">Property Search</button>
        <button className="header-btn header-nav-btn">Body Corporate</button>
        <button className="header-btn header-nav-btn">Commercial</button>
        <button className="header-btn header-nav-btn">Waiheke Escapes</button>
        <button className="header-btn header-nav-btn">FAQ &amp; Contacts</button>
      </div>
    </div>
  );
};

export default Header;
