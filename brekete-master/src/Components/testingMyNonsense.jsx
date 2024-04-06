import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection } from 'firebase/firestore';

const TestingMyNonsense = () => {
  const [albumt, setAlbumt] = useState(null);
  const AlbumCollectionRef = collection(db, 'AlbumMetaData');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getDocs(AlbumCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAlbumt(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      {albumt &&
        albumt.map((album) => (
          <div key={album.id}>
            <h1>{album.Album}</h1>
          </div>
        ))}
    </div>
  );
};

export default TestingMyNonsense