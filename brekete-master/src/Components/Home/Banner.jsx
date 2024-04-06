import React from 'react'
import "../Home/Home.css"
import { useNavigate } from 'react-router-dom'
import hero from '/src/assets/img/hero.png';

const Banner = () => {
 const history = useNavigate()
  const nav = ()=>{
     history("/signup")
  }



  
  return (
   <div  className='trickery ' >
         <div className='hero-card'>
                <div className='hero-div'>
                  <img src="src\assets\img\download (3).png" alt=""  className='hero-clip'/>
                  <img src="src\assets\img\png-transparent-red-musical-symbol-music-symbol-red-note.png" alt=""  className='hero-clip2'/>
                <img src={hero} alt=""  className='hero' />  

         </div>

    <div className='hero-text'>
      
                  <h1  className='hero-text'>Welcome To Brekete-Master.com</h1>
                  <button className='hero-button '  onClick={nav} >Sign up</button>
    </div> 
         </div>
   </div>
  )
}

export default Banner
