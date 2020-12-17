import React from "react";
import "./header.css";
import useTime from "./hooks/use-time";

function Header(props) {
  const user = props.user;

  const profilePic = user.photoURL;
  const time = useTime();
  
  const headerName = user.displayName;

  return (
    <div className="header__container">
      <img id="pfp" src={profilePic} alt="profilePicture" />
      <h1>Greetings, {headerName}</h1>
      <h3>This is your Hub</h3>
      <p>{time}</p>
    </div>
  );
}

export default Header;
