import logo from "../assets/logo.svg";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const handleBtnClick = function () {
    alert('Nice try! Only the "Property Search" button works.');
  };

  return (
    <div className="header-container">
      <div className="header-top">
        <img src={logo} className="header-logo" />
        <p>
          Login or{" "}
          <button
            onClick={handleBtnClick}
            className="header-btn header-login-btn"
          >
            Sign up
          </button>
        </p>
      </div>
      <div className="header-navbar">
        <button onClick={handleBtnClick} className="header-btn header-nav-btn">
          Property Management
        </button>
        <NavLink to="/search" className="header-btn header-nav-btn">
          Property Search
        </NavLink>
        <button onClick={handleBtnClick} className="header-btn header-nav-btn">
          Body Corporate
        </button>
        <button onClick={handleBtnClick} className="header-btn header-nav-btn">
          Commercial
        </button>
        <button onClick={handleBtnClick} className="header-btn header-nav-btn">
          Waiheke Escapes
        </button>
        <button onClick={handleBtnClick} className="header-btn header-nav-btn">
          FAQ &amp; Contacts
        </button>
      </div>
    </div>
  );
};

export default Header;
