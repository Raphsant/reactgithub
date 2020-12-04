import React from 'react'
import { withRouter } from 'react-router'
import Events from '../components/events'
import Header from '../components/header'
import SpotifyPlayer from '../components/spotify-player'
import Weather from '../components/weather'


function MainPage(props) {
    console.log(`one level up props ${props.user}`)
    return (
        <div>
            <Header {...props}/>
            <Weather/>
            <Events {...props}/>
            <SpotifyPlayer/>

        </div>
    )
}

export default withRouter(MainPage)
