import { useContext } from 'react';
import { PlayerContext2 } from '../Components/playerContext2';
import { PlayerProvider } from '../Components/playerContext2';
import Sign from '../Components/sign';

 

const Signup = () => {
  return(
    <div>
    <PlayerProvider>
      <Sign/>
    </PlayerProvider>
       
    
   
  </div>
  )
}

export default Signup;
