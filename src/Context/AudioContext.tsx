import { createContext, useContext, useState } from "react";
import { JsxElement } from "typescript";

export const AudioContext = createContext<any>(null);
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context && typeof window !== "undefined") {
    throw new Error("useAudio must be used within a AudioContext");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: JSX.Element }) => {
  const [song, _setSong] = useState<HTMLAudioElement>();
  const [songUrl, setSongUrl] = useState<string>();
  const [isPaused, setIsPaused] = useState<boolean>();

  const setSong = (url: string) => {
    if (song) {
      song.pause();
    }

    const newSong = new Audio(url);
    newSong.play();
    _setSong(newSong);
    setSongUrl(url);
    setIsPaused(false);
  };

  const pauseSong = () => {
    song?.pause();
    setIsPaused(true);
    setSongUrl("");
  };

  return (
    <AudioContext.Provider value={{ setSong, pauseSong, songUrl, isPaused }}>
      {children}
    </AudioContext.Provider>
  );
};
