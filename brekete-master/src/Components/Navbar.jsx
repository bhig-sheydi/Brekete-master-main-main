import React from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { auth,  } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import {useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faMusic, faGifts, faBook}  from "@fortawesome/free-solid-svg-icons";
import hero from '/src/assets/img/M.png';


const Navbar = () => {

const [user] = useAuthState(auth)
  const [reteaction , setRetraction] = useState( false)

  const navigate = useNavigate();

  const signUserOut =  async ()=>{
            signOut(auth)
            navigate("/")
            
  }

const retractionState =()=>{

  setRetraction(!reteaction)
}

  return (

           <div  className='navbar'  style={{height : reteaction && "100px" }} >
          <img src={hero} alt=""   className='logo'  onClick={retractionState} />
               
       
          


                    <ul style={{visibility  : reteaction &&  "hidden"}} >
                    { !user || (
                              <>

                    
                                
                              <li>
                                
                                <div>
                                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                                </div>
                                <div>
                                  <Link to={"/"} >Home</Link>
                                </div>
                                
                                
                                </li>
                      

                     
                              <li>

                                <div>
                                          <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                                </div>
                                <div>

                                  <Link to={"/songs"}>Music</Link>
                                </div>
                                
                                
                                
                                
                                </li>
                          

                    
                              <li>


                                <div>
                                  <FontAwesomeIcon icon={faGifts}></FontAwesomeIcon>
                                </div>
                                <div>

                                  <Link to={"/give-away"}>Give Away</Link>
                                </div>
                                
                                
                                
                                
                                </li>
                              
                              <div> <li>
                                <div>
                                    <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                                </div>
                                <div>
                                 <Link to={"/about"}>About</Link>
                                </div>
</li>

                                </div>
                              
                          
                                           
                                              
                                            
                                              
                                                                        

                                                       <div  className='logout-div'>
                                                        
                                                          <div className='logout-div'>
                                                            <p>{user?.displayName}</p>
                                                          {/* <img  className='profile' src={user?.photoURL|| ""}  /> */}
                                                          <Link to={"/profile"}>Profile</Link>
                                                          </div>
                                                          <a onClick={signUserOut} >Log out</a>
                                                        </div> 

                                              </>

                    )  }

                      

                    
                     
                      </ul>

                  

      
    </div>

  )
}

export default Navbar

