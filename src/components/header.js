import React from "react";
import { useState } from "react";
import { usersCollection } from "../data/firebase";
import "./header.css";

/**
 * Here is where the message containing the greeting message is going to be.
 * Welcome, Raph
 * Could be Good morning, Good afternoon, or evening depending on the time of the day.
 */

function Header() {
  const [headerName, setHeaderName] = useState("");
  const docRef = usersCollection.doc(localStorage.getItem("username"));

  docRef
    .get()
    .then(function (doc) {
      const data = doc.data();
      setHeaderName(data.name);
      console.log(headerName);
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  return (
    <div className="header__container">
      <h1>Greetings, {headerName}</h1>
    </div>
  );
}

export default Header;
