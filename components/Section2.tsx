"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { BiBook } from 'react-icons/bi'
import { BsHeadphones } from 'react-icons/bs'
import { FaBurger } from 'react-icons/fa6'
import { GiNecklace } from 'react-icons/gi'
import { PiDress } from 'react-icons/pi'

interface CollectionItem {
  title: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  image: string;
  description: string;
} 

const Section2 = () => {
  const collection: CollectionItem[] = [
    {
      title: "Books",
      Icon: BiBook,
      image: '/books.png',
      description: 'Explore a wide range of books across various genres, from fiction to non-fiction, and everything in between.',
    },
    {
      title: "Electronics",
      Icon: BsHeadphones,
      image: '/electronics.png',
      description: 'Discover the latest in electronics, including smartphones, laptops, and accessories to enhance your tech experience.',
    },
    {
      title: "Fast Food",
      Icon: FaBurger,
      image: '/fasstfood.png',
      description: 'Satisfy your cravings with our selection of fast food options, from burgers to pizzas, delivered right to your door.',
    },
    {
      title: "Fashion",
      Icon: PiDress,
      image: '/fasshion.png',
      description: 'Stay trendy with our fashion collection, featuring the latest styles in clothing, shoes, and accessories for every occasion.',
    },
    {
      title: 'Jewelries',
      Icon: GiNecklace,
      image: '/jewelry.png',
      description: 'Adorn yourself with our exquisite jewelry collection, including necklaces, rings, and bracelets that add a touch of elegance.',
    }
  ]

  const [active, setActive] = useState<CollectionItem>(collection[0])

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center px-6 md:px-20 lg:px-36 py-12 text-black'>
      {/* Header */}
      <div className='self-start justify-self-start lg:pl-36 text-left mb-10'>
        <p className='text-3xl md:text-4xl font-bold text-purple-600'>Browse Collection</p>
        <p className='text-gray-600 mt-2 text-sm md:text-base'>For All Things CU</p>
      </div>

      {/* Content */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl'>
        {/* Sidebar */}
        <div className='p-5 rounded-2xl bg-purple-100 flex flex-col'>
          {collection.map((item, index) => (
            <button 
              key={index} 
              onClick={() => setActive(item)} 
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
                ${active.title === item.title ? 'bg-purple-500 text-white' : 'hover:bg-purple-200 text-black'}
              `}
            >
              <item.Icon size={22} className={`${active.title === item.title ? 'text-white' : 'text-purple-600'}`} />
              <span className='text-sm md:text-base font-semibold'>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Preview Section (span 2 cols) */}
        <div className='relative col-span-1 md:col-span-2'>
          <Image 
            src={active.image} 
            alt={active.title} 
            width={800} 
            height={500} 
            className='rounded-2xl shadow-md object-cover w-full h-[350px] md:h-[450px]' 
          />
          {/* Overlay */}
          <div className='absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl'>
            <h3 className='text-xl md:text-2xl font-semibold text-white'>{active.title}</h3>
            <p className='mt-2 text-gray-200 text-sm md:text-base max-w-xl'>{active.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2
