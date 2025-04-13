import React, { useState } from "react";
import search from "../assets/search.png";
import SongCard from "./SongCard";
import { useOutletContext } from "react-router-dom";
import FooterPlay from "./FooterPlay";
const Search = () => {
  let [songArray,setSongArray,index,setIndex,currentSong,setCurrentSong,audioRef,addPlayListMethod,addWishListMethod] = useOutletContext()
  const [query,setQuery] = useState('');
  let filtered;
  const [searchedSong,setSearchSong] = useState([]);
  function searchSong(e){
    setQuery(e.target.value);
    const filtered = songArray.filter((item)=>{
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchSong(filtered);
  }


  return (
    <div className="w-full pt-16 relative">
      <div className="w-full fixed py-5 bg-black z-10">
        <div className="w-[70%] md:w-[60%] mx-auto bg-gray-800 flex rounded-lg">
          <div className="w-[10%] flex items-center justify-center">
            <img src={search} alt=""  className="w-4"/>
          </div>
          <input type="text" placeholder="Search song..." className="py-5 grow outline-0 border-0 text-gray-300 md:text-xl text-[14px]" value={query} onChange={searchSong}/>
        </div>
      </div>
      <div className="w-[90%] md:w-[70%] mx-auto mt-36 flex flex-col gap-5">
         {query==''?<h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-500">Search Songs</h2>:''}
         {
          query!=''?searchedSong.map((item)=>{
            return  <SongCard
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            singer={item.singer}
            song={item.song}
            addPlayList={item.addPlayList}
            addWishlist={item.addWishlist}
            setCurrentSong={setCurrentSong}
            setIndex={setIndex}
            audioRef={audioRef}
            addPlayListMethod={addPlayListMethod}
            addWishListMethod={addWishListMethod}
          />
          }):''
         }
      </div>
      <FooterPlay currentSong={currentSong}/>
    </div>
  );
};

export default Search;
