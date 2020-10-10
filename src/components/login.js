import React from "react";
import { useState } from "react";


function Login() {
  
  const [name, setName] = useState("");
  
  const [city, setCity] = useState("");
  function HomeButton() {
    window.location.reload(false);
  }

  const onNameChange = (event) => {
    setName(event.target.value);
    localStorage.setItem("name", event.target.value);
  };
  const onCityChange = (event) => {
    setCity(event.target.value);
    localStorage.setItem("city", event.target.value);
  };

  return (
    <div className="login-box">
      <h1 className="login-box__title">Hub</h1>
      <p>
        <label className="login-box__label">
          Please enter your name:{" "}
          <input type="text" value={name} onChange={onNameChange} />
        </label>
      </p>
      <p>
        <label className="login-box__label">
          Please enter your city:{" "}
          <input type="text" value={city} onChange={onCityChange} />
        </label>
      </p>
      <button className="login-box__enter" onClick={HomeButton}>
        Enter
      </button>
    </div>
  );
}

export default Login;
