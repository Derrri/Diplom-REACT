import React from "react";
import { Link } from "react-router-dom";
import "./HomeWrapper.css";

const HomeWrapper = ({ children, showLogin }) => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="header_logo">
          <Link to="/" className="header__logo_link"> 
            <span className="bold-text">ИДЁМ</span>
            <span className="header__logo_letter">В</span>
            <span className="bold-text">КИНО</span>
          </Link>
        </h1>
        {showLogin && <button className="login-button">Войти</button>}
      </div>
      {children}
    </div>
  );
};

export default HomeWrapper;
