let PlayerReducer = (state , action) => {
    switch(action.type){
  
      case  "SET_SONGS_ARRAY":
         return {
              ...state,
              songs: action.data
          }
  
  
      case "SET_CURRENT_SONG":
          return{
              ...state,
              currentSong: action.data, 
              playing: true,
              
          }
  
  
  
          
          case "TOGGLE_RANDOM":
              return{
                  ...state,
                  random: action.data,
                  
                  
              }
  
  
          case "TOGGLE_REPEAT":
              return{
                  ...state,
                  repeat: action.data,
                  
                  
              }
  
  
  
              
          case "TOGGLE_PLAYING":
              return{
                  ...state,
                  playing: action.data,
                  
              }
  
  
  
  
              case "setCurrentAlbumPic":
                  return{
                      ...state,
                      currentAlbumPic: action.data, 
                      Showing: true,
                      
                  }
          
  
          case "setCurrentAlbumTitle":
              return{
                  ...state,
                  currentAlbumTitle: action.data, 
                  Showing: true,
                  
              }
  
  
  
              case "setCurrentAlbum":
                  return{
                      ...state,
                      currentAlbum: action.data, 
                      playing: true,
                  }
  
  
  
                         
      case "toggleAlbum":
          return{
              ...state,
              playing: action.data,
              
          }
    }
  
  }
  
  export default PlayerReducer
  
  