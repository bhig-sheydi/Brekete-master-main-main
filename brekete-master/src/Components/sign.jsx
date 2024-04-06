import React, { useState, useEffect } from 'react';
import { auth, provider, db } from "../config/firebase"; // Assuming you have firestore as db
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import image_processing20191101 from '/src/assets/img/running with head phones.gif';
import { useAuth } from '../config/firebase';
import { useContext } from 'react';
import { PlayerContext2 } from '../Components/playerContext2';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import LogIn from '../Pages/logIn';
import hero from '/src/assets/img/M.png';

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { displayName, setUserName } = useContext(PlayerContext2);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const currentUser = useAuth();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
      
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (currentUser?.displayName) {
      setUserName(currentUser.displayName);
    }
  }, [currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email.trim() || !password.trim()) {
        setEmailError('Email and password are required.');
        setLoading(false);
        return;
      }
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      await addUserToFirestore(userCredential.user);
      await signInUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in with email:", error);
    } finally {
      setLoading(false);
    }
  };

  const addUserToFirestore = async (user) => {
    try {
      const userRef = doc(db, "user", user.uid);
      await updateDoc(userRef, {
        displayName: username,
        photoURL: user.photoURL,
        timeSpentPerWeek: 0 // Initialize to 0 when user signs up
      });
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
  };

  const signInUser = async (user) => {
    try {
      // Your sign-in logic goes here, such as navigating to a different page
      navigate("/songs");
    } catch (error) {
      console.error("Error signing in the user:", error);
    }
  };

  return (
    <div className='Signup'>
      <div className='forms'>
        <img src={hero} alt="" className='im' />
        {loading || !showForm ? (
          <img src={image_processing20191101} alt="" className='fancy' />
        ) : (
          <form onSubmit={signInWithEmail}>
            <label>User Name</label>
            <input type="text" name="username" value={username} onChange={handleChange} />
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
            <label>Email/PhoneNumber</label>
            <input type="text" name="email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="submit" value={loading ? 'Signing up...' : 'Sign Up'} disabled={loading} />
            <Link to={"/login"}>Log In</Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default Sign;
