
import { useContext } from "react";
import PlayerContext from "../Components/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faDownload, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../Components/PlayList.css";




const PlayList = () => {
  const { currentSong, setCurrent, albumList, currentAlbum } = useContext(PlayerContext);

  const handleDownload = (fileUrl, title) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = getFileNameFromTitle(title);
    downloadLink.click();
  };

  const getFileNameFromTitle = (title) => {
    return `${title.replace(/\s/g, "_").toLowerCase()}.mp3`;
  };

  return (
    <ul className='playList'>
      {albumList.length > 0 && albumList[currentAlbum]?.albumContent.map((song, index) => (
        <li className={'listContainer ' + (currentSong === index ? "selected" : "")} key={index} onClick={() => setCurrent(index)}>
          <div className='div1'>
            <FontAwesomeIcon icon={faCirclePlay}/>
          </div>
          <div className='div2'>
            <span>{song.songTitle}</span>
            <span>{song.artist}</span>
          </div>
          <div className='div3'>
            <FontAwesomeIcon icon={faHeart}/>
            <FontAwesomeIcon icon={faDownload} title={`Download ${song.songTitle}`} onClick={() => handleDownload(song.fileUrl, song.songTitle)}/>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlayList;
