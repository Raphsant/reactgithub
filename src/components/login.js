import React from "react";
import { useState } from "react";
import db from "../data/firebase";
import { useHistory, Redirect } from "react-router-dom";

import "./login.css";
import LoginPage from "../pages/login-page";


function Login() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [didError, setDidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  

  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onCityChange = (event) => {
    setCity(event.target.value);
  };
  const onUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setDidError(false);
    try {
      await db.collection("users").doc(username).set({
        username: username,
        name: name,
        password: password,
        city: city,
      });
      localStorage.setItem("username", username);
      history.push("/");
      console.log("User created!");
    } catch (error) {
      setDidError(true);
      setErrorMessage("Something went wrong, please try again!");

      console.error();
    }
    setIsLoading(false);
    window.location.reload(false);
  };

  return (
    <div className="container">
      <form onSubmit={onLoginSubmit}>
        <div className="login-box">
          <h1 className="login-box__title">Hub</h1>
          {didError && <div>{errorMessage}</div>}
          {isLoading && <div>is loading please wait</div>}
          <p>
            Please enter your name:{" "}
            <input type="text" value={name} onChange={onNameChange} />
          </p>
          <p>
            Please enter your username:{" "}
            <input type="text" value={username} onChange={onUsernameChange} />
          </p>
          <p>
            Please enter your password:{" "}
            <input type="text" value={password} onChange={onPasswordChange} />
          </p>
          <p>
            Please enter your city:{" "}
            <input type="text" value={city} onChange={onCityChange} />
          </p>
          <button className="login-box__enter" type="submit" >
          Enter
          
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
