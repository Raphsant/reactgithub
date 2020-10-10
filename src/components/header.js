import React from "react";
import "./header.css";

/**
 * Here is where the message containing the greeting message is going to be.
 * Welcome, Raph
 * Could be Good morning, Good afternoon, or evening depending on the time of the day.
 */

function Header() {
 const headerName = localStorage.getItem("name");
  

  return (
    <div className="header__container">
      <h1>Greetings, {headerName}</h1>
    </div>
  );
}

export default Header;
