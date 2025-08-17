"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiSearch, FiStar, FiClock, FiShoppingCart,  } from 'react-icons/fi';
import { BiCartAdd } from 'react-icons/bi';

gsap.registerPlugin(ScrollTrigger);

interface StoreItem {
  id: number;
  title: string;
  image: string;
  description: string;
  store: string;
  buys: number;
  rating: number;
  deliveryTime: string;
  price: string;
}

const storeItems: StoreItem[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    image: '/books.png',
    description: 'High-quality noise-cancelling headphones with long battery life.',
    store: 'TechGadgets Store',
    buys: 1500,
    rating: 4.7,
    deliveryTime: '2-3 days',
    price: '2999.99',
  },
  {
    id: 2,
    title: 'Organic Coffee Beans',
    image: '/electronics.png',
    description: 'Freshly roasted organic coffee beans for a perfect brew.',
    store: 'BrewMasters',
    buys: 3200,
    rating: 4.9,
    deliveryTime: '1-2 days',
    price: '1999.99',
  },
  {
    id: 3,
    title: 'Smart Fitness Watch',
    image: '/electronics.png',
    description: 'Track your fitness goals with this advanced smartwatch.',
    store: 'FitTech',
    buys: 2100,
    rating: 4.5,
    deliveryTime: '3-5 days',
    price: '4999.99',
  }
];

const Store: React.FC = () => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Search bar animation: subtle fade and slide down
    gsap.fromTo(
      searchBarRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Card animation: fade in and slight scale on scroll
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div className='w-screen bg-white'>

    
    <div className="w-full max-w-7xl bg-white text-black mx-auto px-4 py-12">
      {/* Glassmorphic Search Bar */}
      <div
        ref={searchBarRef}
        className="relative mb-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-lg overflow-hidden max-w-2xl mx-auto"
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
      >
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 text-xl" />
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full py-3.5 pl-12 pr-4 bg-transparent text-gray-800 placeholder-gray-500 text-base focus:outline-none focus:ring-0"
        />
      </div>
      <h2 className="text-3xl font-bold text-left mb-8">Top Sellers</h2>
      {/* Store Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {storeItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              {/* Title and Price Row */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                <span className="text-lg font-semibold text-purple-600">{item.price}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  {/* <FiStore className="text-purple-600 mr-2.5 w-5 h-5" /> */}
                  <span className="truncate">{item.store}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FiShoppingCart className="text-purple-600 mr-2.5 w-5 h-5" />
                  <span>{item.buys.toLocaleString()} buys</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 mr-1 ${
                          i < Math.floor(item.rating) ? 'text-purple-600 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2">({item.rating.toFixed(1)})</span>
                </div>
                <div>
                    <div className="flex items-center text-sm text-gray-700">
                        <FiClock className="text-purple-600 mr-2.5 w-5 h-5" />
                        <span>{item.deliveryTime}</span>
                    </div>
                    <button className="mt-3 w-full flex flex-row items-center justify-center  bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        <BiCartAdd size={25}/>
                        <p>Add to Cart</p>
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Store;