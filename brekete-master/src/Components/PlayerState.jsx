import {useReducer, useState, useEffect} from "react"
import PlayerReducer   from "./PlayerReducer.jsx"
import PlayerContext from "./PlayerContext.jsx"
import { TimeToFly } from "../song Data Base/TimeToFly.js"
import { AlbumMetaData } from "../song Data Base/AlbumMetaData.js"
import { getDocs , collection} from "firebase/firestore"
import { db } from "../config/firebase.js"
import React from 'react'





const PlayerState = (props) => {
 const [ally, setAlly] = useState([])


 const [currentUserName,  setCurrentUserName ]  = useState("John Doe")
const musicCollection = collection(db, "AlbumMetaData")
useEffect(()=>{


     
    const getMusic  = async ()=>{

        try {
            const data = await getDocs(musicCollection)
          
            const filterdData = data.docs.map((doc)=> ({...doc.data(), id: doc.id}))
            setAlly(filterdData)
        } catch (error) {
            console.error(error)
        }

          
    }


    getMusic()


}, [])




console.log("stuff" , ally > 0 ? ally[0].album: null)
 
 
    const  initialState = {
        currentSong : 0,
        songList : ally,
        repeat: false,
        random:  false,
        audio: null,
        currentAlbum : 0,
        albumList: AlbumMetaData,
    
    
    }


    const [selectAlbum,setSelectAlbum ] = useState(0)

    const [state, dispatch] = useReducer(PlayerReducer, initialState)

    const setCurrent = (id) => dispatch ({type: "SET_CURRENT_SONG", data: id})
            
            const songSet = (songArr) =>
            dispatch({type: "SET_SONGS_ARRAY", data: songArr})

            const togglePlaying =() => 
            dispatch({type: "TOGGLE_PLAYING", data: state.playing ? false : true})

            const prevSongs = () => {
            if (state.currentSong == 0){
                setCurrent(state.songList.length -1)
            }else{
                    setCurrent(state.currentSong -1)
            }


            }

            const nextSong = () =>{
            if (state.currentSong === state.songList.length -1){
                setCurrent(0)
            }else{
                setCurrent(state.currentSong +1)
            }
            }

            const toggleRepeat = (id) =>
            dispatch({type: "TOGGLE_REPEAT", data: state.repeat ? false : true})

            const toggleRandom = (id) =>
            dispatch({type: "TOGGLE_RANDOM", data: state.random ? false : true})

            const handleEnd = ()=> {
            if(state.random){
                return dispatch(
                    {
                        type: "SET_CURRENT_SONG",
                        data: ~ (Math.random() * state.songList.length)
                    }
                )
            }else if (state.songList.length -1){
                return
            } else {
                nextSong()
            }

            }

                 const CurrentAlbum = (id) => dispatch ({type: "setCurrentAlbum", data: id})
                    
                    
                    
            const changeAlbum =()=>{
                setSelectAlbum(selectAlbum + 1)
                console.log(selectAlbum)
            }
           
            const showAlbum =()=>{
                setSelectAlbum(0)
            
            }
            return <PlayerContext.Provider
                    value ={{
                        currentSong : state.currentSong,
                        songList: TimeToFly,
                        repeat: state.repeat,
                        random:  state.random,
                        audio: state.audio,
                        currentAlbum : state.currentAlbum,
                        albumList: ally,
                        setCurrent,
                        songSet,
                        prevSongs,
                        toggleRandom,
                        toggleRepeat,
                        togglePlaying,
                        handleEnd,
                        nextSong,
                        CurrentAlbum,
                        changeAlbum,
                        selectAlbum,
                        showAlbum,
                        currentUserName,
                         setCurrentUserName ,
                        
                        
                    }}>

                        {props.children}
                    </PlayerContext.Provider>
}

export default PlayerState
