import React from 'react'
import "../Components/Actions.css/"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faDownload, faEllipsis} from "@fortawesome/free-solid-svg-icons";

import { useContext } from 'react';
import PlayerContext from './PlayerContext';


      
const Actions = () => {

  const {changeAlbum, currentAlbum ,albumList, selectAlbum} = useContext(PlayerContext)
  const setFav = () =>{
     console.log("added to fave")

    
  }
  return (
    <div className={`actions-div ${selectAlbum >0 ? "change" : ""}`}>
       <div className='album-pic'>
                <img src={albumList.length > 0 ? albumList[currentAlbum].albumImgUrl: null} alt="" />

         
      </div>

      <div className='album-dets'>
                 <h1>Album : </h1>   
                <h1>{albumList.length > 0 ? albumList[currentAlbum].album:null}</h1>

                 <div className="icons">
                <button onClick={setFav}> <FontAwesomeIcon icon={faHeart}   className='icon' /></button>
                 <button onClick={changeAlbum}>Other Albums</button>
                

                 </div> 
  </div>
 

      
    </div>
  )
}

export default Actions
