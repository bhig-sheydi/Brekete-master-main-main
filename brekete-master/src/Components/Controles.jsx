import React , {useRef , useState, useContext , useEffect } from 'react'


import "../Components/Controles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faStepBackward, faStepForward , faCirclePlay , faPause} from "@fortawesome/free-solid-svg-icons";
import PlayerContext from './PlayerContext';
const Controles = () => {


 

  const{
                       setCurrent,
                        songSet,
                        prevSongs,
                        toggleRandom,
                        toggleRepeat,
                        togglePlaying,
                        handleEnd,
                        currentSong,
                        currentAlbum,
                        albumList,
                        songList,
                        repeat,
                        random,
                        nextSong,
  } = useContext(PlayerContext)


 

  const [stateVolum, setStateVolum] = useState(100)
  const [dur, setDur] = useState(0)
  const [playing , setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
 
  let audio = useRef("audio_tag")
  const handleVolume = (q) =>{
    setStateVolum(q)
    audio.current.volume = q
  }



//   console.log("Song List:", songList);
// console.log("Current Song:", songList[currentSong]);
// console.log("File URL:", songList[currentSong].FileUrl);




  const togglePlayPause = () => {
    togglePlaying();
    audio.current.paused ? audio.current.play() : audio.current.pause();
  };


  // const toggleAudio = () => {
  //   console.log("Audio Element:", audio.current); // Debug: Check if the audio element is present
  //   console.log("Audio Element State:", audio.current.paused); // Debug: Check current state

  //   audio.current.paused ? audio.current.play() : audio.current.pause();

  //   console.log("Audio Element New State:", audio.current.paused); // Debug: Check new state
  // };



  const getPlaying = () => {
    setPlaying(!playing)
  }


  const fmtMSS = (s) => {
    return(s - (s %= 60)) / 60 + (9 < s? ":" : ":0") + ~s
  }


  const handleProgress = (value) => {
    let compute = (value * dur)
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }
  return (

   
    <div className='controle-div'>
          <audio ref={audio}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onCanPlay={(e) => setDur(e.target.duration)}
          onEnded={handleEnd}
          type ="audio/mpeg"
          preload='true'
          src={albumList.length >0 ? albumList[currentAlbum].albumContent[currentSong].fileUrl: null}
          
          />
          <div className='vlme'>
            <span className="volum">
                    <FontAwesomeIcon icon={faVolumeDown}></FontAwesomeIcon>
            </span>

            <input 
            
            value={Math.round(stateVolum * 100)} 
            type='range'
            name='volBar'
            id="volBar"
            onChange={(e) => handleVolume(e.target.value / 100)}
            className='widthV'
            
            
            />
             </div>

        <div className="musicControles">


         
          <div className='ctl'>
           <span className='prev' onClick={prevSongs}>
              <FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon>
            </span>

              <span 
              className='play'

              onClick={()=>{
                togglePlaying()
                toggleAudio()
                getPlaying()
              }}
              
              >
                  <span className='play' onClick={togglePlayPause}>
          {audio.current && audio.current.paused ? (
            <FontAwesomeIcon icon={faCirclePlay}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
          )}
        </span>
              </span>

            <span className='prev' onClick={nextSong}>
            <FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon>
            </span>


           </div>



                <div className="progressBar2">
                <progress id="file" value={dur ? (currentTime*100)/ dur : 0} max="100" onClick={handleProgress}></progress>

                <div className="time">
                     <span className='currentT'>{fmtMSS(currentTime)}</span>/
                     <span className='totalT'>{fmtMSS(dur)}</span>
                </div>
        </div> 
        
           
        
        </div>


        <div className="progressBar">
                   <div className="songMeta">
                        <span className="songTitle">{albumList > 0 ? albumList[currentAlbum].albumContent[currentSong].albumTitle: null}</span>
                        <span className='artistName'>{albumList >0 ? albumList[currentAlbum].albumContent[currentSong].artist: null}</span>
                   </div>
      
      </div>
    </div>
  )
}

export default Controles
