import React from 'react'
import Image from 'next/image'
import Searchbar from './Searchbar'
import Sidebar from './Sidebar'
import { BiCartAdd } from 'react-icons/bi'
import { BsStarFill } from 'react-icons/bs'
import HeroCard from './HeroCard'

const Hero = () => {
  return (
    <div className='w-screen relative min-h-screen bg-[url(/purple_grad.jpg)] bg-fixed bg-cover flex flex-col md:justify-start justify-center  items-center'>
        <div className="w-screen h-screen absolute z-5 bg-black/40 "/>
        
        <div className="relative z-40 flex flex-col justify-start px-10 items-center  pt-14 text-white text-center space-y-4">
            <Image src={'/glitch.png'} alt='logo' width={300} height={300} className='animate-pulse max-md:hidden '/>
            <p className='md:text-6xl text-2xl font-bold'>One Stop Shop For <span className='text-shadow-purple-900 text-shadow-2xs text-purple-400'>ALL THINGS CU</span>  </p>
            <p>3-5 days delivery and freaking affordable</p> 
            <Searchbar/>
            
        </div>
        <HeroCard/>
       <Sidebar/>
    </div>
  )
}

export default Hero