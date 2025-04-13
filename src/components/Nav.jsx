import React from 'react'
import home from '../assets/home.png'
import search from '../assets/search.png'
import addList from '../assets/add-to-playlist.png'
import heart from '../assets/heart.png'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <nav className='bg-black rounded-t-4xl md:rounded-0 w-full mx-auto flex h-20 md:h-16 justify-center items-center gap-16 md:gap-8 fixed z-10 bottom-0 md:top-0 left-0'>
      <Link to="/">
        <img src={home} alt="" className='w-6'/>
      </Link>
      <Link to="/search">
        <img src={search} alt="" className='w-6'/>
      </Link>
      <Link to="/playlist">
        <img src={addList} alt="" className='w-8'/>
      </Link>
      <Link to="liked">
        <img src={heart} alt="" className='w-6'/>
      </Link>
    </nav>
  )
}

export default Nav
