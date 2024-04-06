import React, { useState, useEffect } from 'react';
import { storage } from '../config/firebase';
import { v4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import logo from '/src/assets/img/M.png';
import image_processing20191101 from '/src/assets/img/running with head phones.gif';

import '../Components/test.css';

const AdminsOnly = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [albumTitle, setAlbumTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [titles, setTitles] = useState([]);
  const [albumContent, setAlbumContent] = useState([]);
  const [audioUrls, setAudioUrls] = useState([]);
  const [hide, setHide] = useState(0);
  const [showLoading, setShowLoading] = useState(false); // State to control the visibility of loading GIF

  const albumCollection = collection(db, 'AlbumMetaData');

  const handleAudioChange = (event) => {
    setAudioFiles(Array.from(event.target.files));
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const uploadFiles = async () => {
    if ((audioFiles.length === 0 && !imageFile) || loading) return;
    let audioURLs = []; // Initialize array to store audio URLs
    setLoading(true);
    setShowLoading(true); // Show loading GIF when upload starts

    const promises = [];

    audioFiles.forEach((file) => {
      const storageRef = ref(storage, `${albumTitle}/${file.name + v4()}`);
      promises.push(
        uploadBytes(storageRef, file).then(() => {
          // Get download URL for the uploaded audio file
          return getDownloadURL(storageRef).then((url) => {
            audioURLs.push(url); // Store the URL in the array
          });
        })
      );
    });

    if (imageFile) {
      const imgStorageRef = ref(storage, `${albumTitle}/${imageFile.name + v4()}`);
      promises.push(uploadBytes(imgStorageRef, imageFile));
    }

    Promise.allSettled(promises)
      .then(() => {
        alert('Files Uploaded');
        setAudioUrls(audioURLs);
      })
      .catch((error) => {
        console.error('Error uploading files:', error.message);
      })
      .finally(() => {
        setLoading(false);
        setShowLoading(false); // Hide loading GIF when upload completes
      });
  };


  

  const onSubmitMovie = async () => {
    try {
      let albumImgUrl= ''; // Initialize albumImgUrl

      if (imageFile) {
        const imgStorageRef = ref(storage, `${albumTitle}/${imageFile.name + v4()}`);
        await uploadBytes(imgStorageRef, imageFile);
        albumImgUrl= await getDownloadURL(imgStorageRef);
      }

      await addDoc(albumCollection, { album: albumTitle, albumImgUrl, albumContent });
      alert('Songs Added Successfully'); // Show alert when songs are added
    } catch (error) {
      console.error(error);
    }
  };

  const addTitle = () => {
    const newTitle = {
      albumTitle: albumTitle,
      artist: artist,
      songTitle: songTitle,
    };

    const updatedTitles = [...titles, newTitle];
    setTitles(updatedTitles);
    setSongTitle('');

    // Update albumContent state with the array of titles
    const albumContentArray = updatedTitles.map((title, index) => ({
      albumTitle: title.albumTitle,
      artist: title.artist,
      fileUrl: audioUrls[index] || '', // Assign corresponding URL or empty string if not available
      songTitle: title.songTitle,
    }));

    setAlbumContent(albumContentArray);
  };

  useEffect(() => {
    // Access audioUrls state here
    console.log(audioUrls);
  }, [audioUrls]);

  return (
    <div className="general">
      <div className="form">
        <div className={hide < 1 ? 'pannel' : 'hide'}>
          <img src={logo} alt="" />
          <label htmlFor="audio">Add Audio files</label>
          <input type="file" id="audio" onChange={handleAudioChange} multiple accept="audio/*" />
          <label htmlFor="image">Add Album Art</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
          <button onClick={uploadFiles} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Files'}
          </button>
          {showLoading && <img src={image_processing20191101} alt="Loading..." />} {/* Show loading GIF */}
          <a onClick={() => setHide(1)}>next</a>
        </div>
        <div className="sorting">
          <div className={hide === 1 ? 'pannel' : 'hide'}>
            <img src={logo} alt="" />
            <label htmlFor="albumTitle">Add Album Title</label>
            <input type="text" id="albumTitle" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} />
            <label htmlFor="artist">Add Artist</label>
            <input type="text" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <label htmlFor="songTitle">Add Song Title</label>
            <input type="text" id="songTitle" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />
            <button onClick={addTitle}>Add Title</button>
            {loading && <div><h1>Loading......</h1></div>}
            <button onClick={onSubmitMovie} disabled={loading}>
              {loading ? 'Adding Songs...' : 'Upload Songs'}
            </button>
            <a onClick={() => setHide(hide - 1)}>prev</a>
          </div>
          <div className={hide === 1 ? "general3" : "hide"}>
            <h2>Titles Added</h2>
            <ul>
              {titles.map((title, index) => (
                <li key={index}>
                  <p>Song Title: {title.songTitle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsOnly;
