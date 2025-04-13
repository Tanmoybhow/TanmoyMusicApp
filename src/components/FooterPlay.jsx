import React from "react";
import play from "../assets/play-white.png";
import pause from "../assets/pause-white.png";
import { useOutletContext } from "react-router-dom";
const FooterPlay = () => {
  let [
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
    setProgressing,
  ] = useOutletContext();
  return (
    <div className="w-full md:w-[60%] bg-white fixed pb-8 md:pb-0 bottom-14 md:bottom-0 left-1/2 -translate-x-1/2 flex py-3 px-7 gap-5 items-center rounded-t-4xl">
      <img src={currentSong.img} alt="" className="w-[60px] md:w-[90px] rounded-xl" />
      <div className="grow">
        <p className="text-xl md:text-3xl font-semibold">{currentSong.title}</p>
        <p className="text-[10px] font-semibold">{currentSong.singer}</p>
      </div>
      <div
        className="w-12 h-12 rounded-full bg-black flex items-center justify-center cursor-pointer"
        onClick={() => {
          if (isPlaying) {
            audioRef.current.pause();
            console.log("pause");
          } else {
            audioRef.current.play();
            console.log("play");
          }
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? (
          <img src={pause} alt="" className="w-[12px]" />
        ) : (
          <img src={play} alt="" className="w-[12px]" />
        )}
      </div>
    </div>
  );
};

export default FooterPlay;
