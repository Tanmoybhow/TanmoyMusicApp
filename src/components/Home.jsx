import React, { useEffect, useRef, useState } from "react";
import prev from "../assets/prev.png";
import next from "../assets/next.png";
import play from "../assets/play.png";
import pause from "../assets/pause.png";
import downArrow from "../assets/down-arrow.png";
import SongCard from "./SongCard";
import { useOutletContext } from "react-router-dom";
import FooterPlay from "./FooterPlay";
const Home = () => {
  // let [index, setIndex] = useState(0);
  // const [currentSong, setCurrentSong] = useState(songArray[index]);

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
    handlePlay
  ] = useOutletContext();
  const progressRef = useRef(null);
  const [allSongShow, setAllSongShow] = useState(false);
  const leftHome = useRef();
  const rightHome = useRef();
  const arrow = useRef();
  const home = useRef();
  

  const nextSong = () => {
    if (isPlaying) {
      // audioRef.current.play();
      setTimeout(() => {
        handlePlay();
      }, 200);
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
  const lastClickTimeRef = useRef(0);
  const prevSong = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;

    if (timeSinceLastClick < 1500) {
      // Double click within 1.5 seconds — go to previous song
      setIndex((prev) => {
        const newIndex = prev > 0 ? prev - 1 : songArray.length - 1;
        setCurrentSong(songArray[newIndex]);
        return newIndex;
      });
    } else {
      // Single click — restart current song
      audioRef.current.currentTime = 0;
        setTimeout(() => {
          handlePlay();
        }, 200);
        setIsPlaying(true);
      
    }

    lastClickTimeRef.current = now; // update the last click time
  };

  const seekAudio = (e) => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  };
  function showAllSong() {
    if (arrow) {
      home.current.classList.toggle('showAllSong');
    }
  }
  return (
    <div className="home p-0  md:p-16 flex relative overflow-hidden md:overflow-visible" ref={home}>
      <div className="leftHeading w-full md:w-[40%] h-8 md:h-0 mx-auto fixed z-50 px-4 bg-black py-7  flex items-center ">
          <img src={downArrow} id="arrow" alt="" className="block md:hidden" onClick={showAllSong} ref={arrow} />
          <div className="grow">
          <h2
            className="text-xl md:text-2xl text-gray-50 text-center"
          >
            Now Playing
          </h2>
          </div>
        </div>
      <div
        className="leftHome flex flex-col w-full md:w-1/2 items-center justify-center gap-7 p-5 pt-14 fixed left-0 top-[50%] -translate-y-[50%] md:translate-0 md:top-20"
        ref={leftHome}
      >
        
        <div className="w-64 h-[250px] overflow-hidden rounded-2xl relative">
          <img
            src={currentSong.img}
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
        <div className="text-gray-50 text-center">
          <p id="songTitle" className="text-3xl font-bold mb-2">
            {currentSong.title}
          </p>
          <p id="singer" className="text-gray-400 text-lg">
            {currentSong.singer}
          </p>
        </div>
        <div
          id="progressBar"
          className="w-[70%]  bg-gray-500 h-1.5 rounded-2xl cursor-pointer relative"
          ref={progressRef}
          onClick={seekAudio}
        >
          <div
            id="progress"
            className="absolute h-full bg-gray-50 top-0 left-0 rounded-2xl"
            style={{ width: `${progressing}%` }}
          >
            <div className="w-[17px] h-[17px] bg-blue-600 rounded-full absolute -top-1.5 right-0"></div>
          </div>
        </div>
        <div id="pause-play" className="flex items-center justify-center gap-6">
          <img
            src={prev}
            alt=""
            className="w-[22px] cursor-pointer"
            onClick={prevSong}
          />
          <div
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center cursor-pointer"
            onClick={() => {
              if (isPlaying) {
                audioRef.current.pause();
              } else {
                audioRef.current.play();
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
          <img
            src={next}
            alt=""
            className="w-[22px] cursor-pointer"
            onClick={nextSong}
          />
        </div>
      </div>
      <div
        className="rightHome absolute w-full md:w-1/2 md:top-12 top-[670px] md:block bg-black  min-h-10 md:pt-8 pt-0 right-0 pb-0 md:pb-10 transition-all"
        ref={rightHome}
      >
        <div className="songList mb-8 md:mb-0 w-[90%] h-full mx-auto flex flex-col gap-5">
          {songArray.map((item) => {
            return (
              <SongCard
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
                singer={item.singer}
                song={item.song}
                addPlayList={item.addPlaylist}
                addWishlist={item.addWishlist}
                setCurrentSong={setCurrentSong}
                setIndex={setIndex}
                audioRef={audioRef}
                addPlayListMethod={addPlayListMethod}
                addWishListMethod={addWishListMethod}
              />
            );
          })}
        </div>
        <div className="footerPlay hidden">
          <FooterPlay currentSong={currentSong}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
