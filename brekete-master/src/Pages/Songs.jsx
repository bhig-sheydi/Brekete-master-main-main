import React from 'react'
import SongAlbum from '../Components/SongAlbumH'
import Albums from '../Components/Albums'
import PlayerState from '../Components/PlayerState'


const Songs = () => {
  return (
    <div>
      <PlayerState>
      <SongAlbum/>
      <Albums/>


      </PlayerState>
    </div>
  )
}

export default Songs
