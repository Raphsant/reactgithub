import React from "react";

import Header from "./header";
import SpotifyPlayer from "./spotify-player";
import Weather from "./weather";
import "./app.css";
import Login from "./login";

function App() {
  function TryLogin() {
    if (localStorage.getItem("name") !== null) {
      return (
        <div>
          <Header />
          <Weather />
          <SpotifyPlayer />
        </div>
      );
    } else {
      return (
        <div>
          <Login />
        </div>
      );
    }
  }
  return (
    <div className="topContainer">
      <div className="container">{TryLogin()}</div>
    </div>
  );
}


export default App;
