import React from "react";
import { useState } from "react";
import { usersCollection } from "../data/firebase";
import "./header.css";

/**
 * Here is where the message containing the greeting message is going to be.
 * Welcome, Raph
 * Could be Good morning, Good afternoon, or evening depending on the time of the day.
 */

function Header(props) {
  const user = props.user;
  console.log(`HEADER COMPONENT PROPS: ${user.displayName}`)
  const headerName = user.displayName;

  return (
    <div className="header__container">
      <h1>Greetings, {headerName}</h1>
    </div>
  );
}

export default Header;
