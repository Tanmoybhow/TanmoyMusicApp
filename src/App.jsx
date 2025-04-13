import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { useEffect, useRef, useState } from "react";
import { songArrays } from "./SongData";
function App() {
  const [songArray, setSongArray] = useState(songArrays);
  let [index, setIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songArray[index]);
  const audioRef = useRef(new Audio(currentSong.song));
  let [isPlaying, setIsPlaying] = useState(false);
  const [progressing, setProgressing] = useState(0);
   useEffect(() => {
      audioRef.current.pause();
      setIsPlaying(false)
      audioRef.current = new Audio(currentSong.song);
      setIsPlaying(true);
        audioRef.current.play();
      const audio = audioRef.current;
      const updateProgress = () => {
        const duration = audio.duration;
        const currentTime = audio.currentTime;
        if (duration) {
          const percent = (currentTime / duration) * 100;
          setProgressing(percent);
        }
      };
      audio.addEventListener("timeupdate", updateProgress);
  
      const handleEnded = () => {
        if (isPlaying) {
          audioRef.current.play();
        }
        setProgressing(0);
        index++;
        if (index < songArray.length) {
          setIndex(index);
          setCurrentSong(songArray[index]);
        } else {
          setIndex(0);
          setCurrentSong(songArray[0]);
        }
      };
  
      audio.addEventListener("ended", handleEnded);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnded);
      };
    }, [currentSong, audioRef]);
  const addPlayListMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let SingleElement = songArray.find(
      (item) => item.id == e.currentTarget.parentElement.parentElement.id
    );
    let x = !SingleElement.addPlaylist;
    let updatedPlayList = { ...SingleElement, addPlaylist: x };
    setSongArray(
      songArray.map((item) => {
        return item.id == updatedPlayList.id ? updatedPlayList : item;
      })
    );
  };
  const addWishListMethod = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let SingleElement = songArray.find(
      (item) => item.id == e.currentTarget.parentElement.parentElement.id
    );
    let x = !SingleElement.addWishlist;
    let updatedPlayList = { ...SingleElement, addWishlist: x };
    setSongArray(
      songArray.map((item) => {
        return item.id == updatedPlayList.id ? updatedPlayList : item;
      })
    );
  };
  return (
    <>
      <Nav />
      <Outlet
        context={[
          songArray,
          setSongArray,
          index,
          setIndex,
          currentSong,
          setCurrentSong,
          audioRef,
          addPlayListMethod,
          addWishListMethod,
          isPlaying,
          setIsPlaying,
          progressing, 
          setProgressing
        ]}
      />
    </>
  );
}

export default App;
