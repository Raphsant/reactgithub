import React from 'react'
import { withRouter } from 'react-router'
import Events from '../components/events'
import Header from '../components/header'
import SpotifyPlayer from '../components/spotify-player'
import Weather from '../components/weather'


function MainPage() {
    return (
        <div>
            <Header/>
            <Weather/>
            <Events/>
            <SpotifyPlayer/>

        </div>
    )
}

export default withRouter(MainPage)