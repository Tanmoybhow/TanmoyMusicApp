import React from 'react'
import addList from '../assets/add-list.png'
import removeList from '../assets/remove-list.png'
import heart from '../assets/heart.png'
import heartBorder from '../assets/heart-border.png'
import { useOutletContext } from 'react-router-dom'

const SongCard = ({id,img,singer,title,song,addPlayList,addPlayListMethod,addWishlist,addWishListMethod}) => {
  let [songArray,setSongArray,index,setIndex,currentSong,setCurrentSong,audioRef] = useOutletContext()
  const setSong = (e) =>{
     const index = e.currentTarget.id;
     setIndex(index);
      setCurrentSong(songArray[index]);
      audioRef.current.play();
  }
  return (
    <div id={id} className='w-full h-[90px] md:h-[120px] bg-gray-800 cursor-pointer hover:bg-gray-700 transition-all flex items-center p-3 rounded-lg gap-5' onClick={setSong}>
      <img src={img} alt="" className='w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-lg object-fill'/>
      <div className='grow'>
        <p className='text-[16px] md:text-2xl text-gray-50 font-semibold line-clamp-2'>{title}</p>
        <p className='text-[12px] md:text-[14px] text-gray-400 font-semibold line-clamp-1'>{singer}</p>
      </div>
      <div className='flex items-center gap-4 pr-3'>
        <div className='cursor-pointer' onClick={addPlayListMethod}>
         {addPlayList?<img src={removeList} alt="" className='max-w-[20px] md:w-[38px]'/>:<img src={addList} alt=""  className='max-w-[20px] md:w-[38px]'/>} 
        </div>
        <div className='cursor-pointer' onClick={addWishListMethod}>
        {addWishlist?<img src={heart} alt="" className='max-w-[20px] md:w-[28px]'/>:<img src={heartBorder} alt="" className='max-w-[20px] w-[28px]'/>}
        </div>
      </div>
    </div>
  )
}

export default SongCard
