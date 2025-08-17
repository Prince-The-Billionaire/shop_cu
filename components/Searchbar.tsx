import React from 'react'
import { BsSearch } from 'react-icons/bs'

const Searchbar = () => {
  return (
    <div className="flex flex-row rounded-xl backdrop-blur-lg pl-2 bg-white/30 items-center justify-between border-purple-400 border">
        <BsSearch className='text-white/30' size={24}/>
        <input type="search" alt='searchbar' className=' lg:w-2xl md:w-xl w-full h-10 ml-2  ring-0 border-0 focus:ring-0 focus:border-0 focus:outline-0 ' placeholder='searching.....'/>
        <button className='rounded-2xl p-2 px-4 bg-purple-600'>Search</button>
    </div>
  )
}

export default Searchbar