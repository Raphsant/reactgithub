import React from 'react'
import Events from './events'
import Header from './header'
import SpotifyPlayer from './spotify-player'
import Weather from './weather'



function App() {
    return (
        <div>
            <Header/>
            <Weather/>
            <Events/>
            <SpotifyPlayer/>
        </div>
    )
}

export default App
