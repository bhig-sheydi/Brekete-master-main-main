import {useState} from "react"
import React from 'react'
import Actions from "../Components/Actions.jsx"
import PlayList from "../Components/PlayList.jsx"
import Header from "../Components/Header.jsx"
import PlayerState from "../Components/PlayerState.jsx"
import Controles from "../Components/Controles.jsx"
import Albums from "../Components/Albums.jsx"



const AlbumTimeToFly = () => {


  return (
    
   <PlayerState>
    <div>
       <Header/>
       <Actions/> 
      <Albums></Albums>
      <PlayList/> 
    
          <div>
          <Controles/>
          </div>
  
    </div>
    </PlayerState> 


  )
}

export default AlbumTimeToFly
