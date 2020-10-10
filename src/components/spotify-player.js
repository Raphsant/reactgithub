import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./player/player";

import "./spotify.css";

class SpotifyPlayer extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
    }

    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false,
        });
      },
    });
  }

  render() {
    return (
      <div className="spotify-login__container">
        <header className="spotify-login__header">
          {!this.state.token && (
            <a
              className="spotify-login__link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          )}
          {this.state.no_data && (
            <p>
              You need to be playing a song on Spotify, for something to appear
              here.
            </p>
          )}
        </header>
      </div>
    );
  }
}

export default SpotifyPlayer;
