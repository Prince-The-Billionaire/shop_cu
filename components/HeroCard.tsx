import React from 'react'
import { BiCartAdd } from 'react-icons/bi'
import { BsStarFill } from 'react-icons/bs'
import Image from 'next/image'

const HeroCard = () => {
  return (
    <div className='flex flex-row max-md:hidden relative md:absolute bottom-0 left-5 z-20 gap-3 bg-purple-400/50 backdrop-blur-2xl rounded-xl p-3'>
        <Image src={'/docs.png'} className='object-contain' alt="docs" width={100} height={100}/>
        <div className='flex flex-col justify-start items-start space-y-2'>
            <p className='text-white font-bold md:text-xl text-sm md:max-w-40 text-left text-wrap'>Black Doctor Martins Shoe</p>
            <p className='text-black/60 max-md:text-xs'>#<span className=' line-through '>85,000</span></p>
            <p className='max-md:text-xs'>Be The Shoe</p>
            
        </div>
        
            <div className='flex flex-col justify-between items-end space-y-2'>
              <p className='text-white max-md:text-xs  font-bold text-lg p-2 rounded-xl bg-green-600'>₦55,000</p>
              <div className='flex max-md:hidden flex-row gap-2'>{[1,2,3,4,5].map((item) => (<BsStarFill key={item} className="text-orange-400"/>))}</div>
              <p>100+ sold</p>
              <button className='bg-purple-400 cursor-pointer flex h-fit flex-row  p-2 px-4 rounded-xl'>
                <BiCartAdd size={20}/>
                <span className="text-xs">Add To Cart</span>
              </button>
        </div>
    </div>
   
  )
}

export default HeroCard