import React from 'react'
import SongCard from './songCard';
import { useOutletContext } from 'react-router-dom';
import FooterPlay from './FooterPlay';
const PlayList = () => {
  let [songArray,setSongArray,index,setIndex,currentSong,setCurrentSong,audioRef,addPlayListMethod,addWishListMethod] = useOutletContext()
  const playList = songArray.filter((item)=> item.addPlaylist);
  return (
    <div className='pt-16 relative'>
      <div className='w-full bg-black mt-7 fixed top-12 text-center py-8 '>
      {playList.length==0?<h1 className='text-gray-600 text-2xl md:text-3xl font-semibold'>No Songs In playlist</h1>:
      <h1 className='text-gray-600 text-2xl font-semibold'>Playlist</h1>}
      </div>
      <div className='w-[90%] md:w-[70%] mx-auto mt-36 flex flex-col gap-5'>
        {
          playList.map((item) => {
            return <SongCard
            key={item.id}
            id={item.id}
            img={item.img}
            title={item.title}
            singer={item.singer}
            song={item.song}
            addPlayList={item.addPlaylist}
            addWishlist={item.addWishlist}
            addPlayListMethod={addPlayListMethod}
            addWishListMethod={addWishListMethod}
          />
          })
        }
      </div>
      <FooterPlay currentSong={currentSong}/>
    </div>
  )
}

export default PlayList
