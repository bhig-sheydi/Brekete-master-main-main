import React from 'react'
import { useRef } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { useContext } from "react"
import "/src/Components/Albums.css"
import { useState } from 'react'
import PlayerContext from './PlayerContext.jsx'



const Albums = () => {

const [selectedAlbum, setSelectedAlbum] = useState()
    const setC= () =>{

        if (currentAlbum)
        {
          setSelectedAlbum(currentAlbum)
        }

        
       

    }
   
    const{
 
         albumList, currentAlbum, CurrentAlbum, selectAlbum,showAlbum
} = useContext(PlayerContext)
   return(

    <Swiper
    spaceBetween={50}
    slidesPerView={4}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    className={`album2 ${selectAlbum < 1 ? "change" : ""}`}
    
  >
    {albumList.map((album, i) => (
      <SwiperSlide
        key={i}
        className={`albumPic ${currentAlbum === i ? "selectedAlbum" : ""}`}
        onClick={() => {
          CurrentAlbum(i);
          setC();
          showAlbum()
          
        }} 
      >
        <img src={album.albumImgUrl} alt={album.albumImgUrl} />
        <h1>{album.Album}</h1>
      </SwiperSlide>
    ))}
  </Swiper>
);
}

export default Albums
