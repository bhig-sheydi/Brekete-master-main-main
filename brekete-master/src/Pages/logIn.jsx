import React, { useState, useEffect } from 'react';
import { auth, provider } from "../config/firebase";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "../index.css";
import image_processing20191101 from '/src/assets/img/running with head phones.gif';
import hero from '/src/assets/img/M.png';


const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error , setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/songs");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/songs");
    } catch (error) {
      console.error("Wrong email or password :", error);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Signup'>
      
      <div className='forms'>
   <img src={hero} alt=""  className='im'/>
        {loading || !showForm ? ( // Display the GIF if loading or the form is not yet shown
          <img src={image_processing20191101} alt="" className='fancy' />
        ) : (
          <form onSubmit={signInWithEmail}  >
            <label>
              Password
              </label>
              <input type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
           
            <label>
              Email/PhoneNumber
              </label>
              <input type="text" name="email" onChange={(e) => { setEmail(e.target.value) }} />
            
            <input type="submit" value={loading ? 'Signing up...' : 'Sign Up'} disabled={loading} />
            <button onClick={signInWithGoogle} disabled={loading}>
              {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
            </button>
                 {error && <span>wrong emaIL or password </span>}
                 <span onClick={()=>{navigate("/signup")}}>Sign up</span>
          </form>
        )}
      </div>
    </div>
  );
}

export default LogIn;
