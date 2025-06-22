import React, { createContext, useContext, useState } from 'react';

interface MusicContextType {
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicEnabled, setMusicEnabled] = useState(true);

  return (
    <MusicContext.Provider value={{ musicEnabled, setMusicEnabled }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};