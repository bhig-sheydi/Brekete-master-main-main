import React, { createContext, useState } from 'react';

const PlayerContext2 = createContext();

const PlayerProvider = ({ children }) => {
  const [displayName, setUserName ] = useState('john doe');

  return (
    <PlayerContext2.Provider value={{ displayName, setUserName }}>
      {children}
    </PlayerContext2.Provider>
  );
};

export { PlayerProvider, PlayerContext2 };
