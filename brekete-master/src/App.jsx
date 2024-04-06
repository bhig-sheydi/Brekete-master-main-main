import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Videos from './Pages/Videos';
import Give from './Pages/Give';
import About from './Pages/About';
import Signup from './Pages/Signup';
import AlbumTimeToFly from './Pages/AlbumTimeToFly';
import AdminsOnly from './Pages/AdminsOnly';
import TestingMyNonsense from './Components/testingMyNonsense';
import LogIn from './Pages/logIn';
import { auth } from "./config/firebase";
import Profile from './Pages/Profile';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearLocalStorage = () => {
    // Clear localStorage when user logs out
    localStorage.removeItem('user');
  };

  const Required = ({ children }) => {
    if (loading) {
      // Show loading indicator or skeleton screen while authentication is in progress
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/signup" />;
    }

    return children;
  };

  return (
    <div className='App'>
      <Router>
        <div>
          <Navbar />
          <div>
            {/* <div className='general'>
              <Footer />
            </div> */}
          </div>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Songs' element={<Required><AlbumTimeToFly /></Required>} />
          {/* <Route path='/videos' element={<Videos/>}/> */}
          <Route path='/give-away' element={<Give />} />
          <Route path='/about' element={<Required><About /></Required>} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/Admin" element={<Required><AdminsOnly /></Required>} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/profile" element={<Required><Profile /></Required>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
