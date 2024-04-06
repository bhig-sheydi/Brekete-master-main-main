import React, { useEffect, useRef , useState} from 'react';
import "../Components/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getDocs, collection } from 'firebase/firestore';
import { db, useAuth, upload } from '../config/firebase'; // Importing useAuth and upload function
import userPh from "../assets/img/user.png";
import PlayerState from '../Components/PlayerState'

const Profile = () => {
  const currentUser = useAuth();
  const fileInputRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(userPh); // Corrected typo in state variable name
  const [typings, setTypings] = useState(""); // Corrected typo in state variable name
  const [loading, setLoading]  = useState(false);
  const userCollectionRef = collection(db, "User"); // Corrected typo in variable name

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setTypings(selectedFile);
    }
  };
  

  useEffect(() => {
    if (typings) {
      upload(typings, currentUser, setLoading);
    }
  }, [typings, currentUser, setLoading]);
  useEffect(() => {
    if (currentUser?.photoURL) { // Corrected typo in property name
      setPhotoUrl(currentUser.photoURL); // Corrected typo in property name
    }
  }, [currentUser]);

  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })); // Fixed merging doc data and id
        setUserList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getUserList();
  }, []); // Fetch user list only once on component mount

  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger click event on file input
  };

  return (

    <PlayerState>

    <div className='profile'>
      <div className='arangemen'>
        <div className='div1'>
          <button onClick={handleIconClick}>
            <img src={photoUrl} alt="profile pic" />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the file input
              onChange={handleChange}
            />
          </button>
          <p>{"I'm a fan of Brekete Master"}</p>
        </div>
        <div className='div2'>
          <h1>Welcome {currentUser ? currentUser.displayName : ""}</h1> {/* Display user's display name if available */}
          <h4>User Rank: {currentUser ? currentUser.userRank : "Unknown"}</h4> {/* Display user's rank if available */}
          <button>Contact Brekete Master</button>
        </div>
      </div>
    </div>


    </PlayerState>

  );
};

export default Profile;
