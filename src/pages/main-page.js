import React from "react";
import { withRouter } from "react-router";
import Events from "../components/events";
import Header from "../components/header";
import SpotifyPlayer from "../components/spotify-player";
import Weather from "../components/weather";
import "./main-page.css";

function MainPage(props) {
  return (
    <div className="grid-container">
      <Header className="grid-elements" {...props} />
      <Weather className="grid-elements" {...props} />
      <Events className="grid-elements" {...props} />
      <SpotifyPlayer className="spotify" />
      <div>I'm also trying to cause conflict</div>
      <div>FIFTH TIME CAUSING CONFLICT</div>
    </div>
  );
}

export default withRouter(MainPage);
