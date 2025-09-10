"use client"
import React from "react"
import { Button } from "./ui/button"
import { FaShoppingCart, FaLaptop, FaTshirt, FaGem, FaBook, FaBlog } from "react-icons/fa"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"

const Header = () => {
  const { getTotalItems, isOpen, toggleCart } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header
      className="fixed md:left-10 max-md:bottom-2 max-md:h-fit max-md:w-[90%] max-md:left-5   md:top-1/5 z-50 
      rounded-2xl 
      
      bg-orange-400/20 
      backdrop-blur-xl 
      border border-white/20 
      shadow-lg shadow-orange-500/20
      "
    >
      <div className="container mx-auto px-2 py-2 md:py-6">
        <nav className="flex flex-col max-md:flex-row items-center max-md:space-x-10 justify-between md:space-y-10">
          {/* Logo */}
          <Image
            src={'/campuscart_logo.png'}
            alt="campus cart logo"
            width={50}
            height={50}
          />

          {/* Links */}
          <div className="hidden md:flex flex-col items-center space-y-6">
            <a
              href="/store?category=electronics"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaLaptop className="text-2xl mb-1" />
              {/* Electronics */}
            </a>
            <a
              href="/store?category=clothes"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaTshirt className="text-2xl mb-1" />
              {/* Clothes */}
            </a>
            <a
              href="/store?category=jewelry"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaGem className="text-2xl mb-1" />
              {/* Jewelry */}
            </a>
            <a
              href="/store?category=books"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaBook className="text-2xl mb-1" />
              {/* Books */}
            </a>
            <a
              href="/blogs"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaBlog className="text-2xl mb-1" />
              {/* Blogs */}
            </a>
          </div>

          {/* Cart with badge */}
          <div onClick={toggleCart}  className="relative">
            <Button className="font-serif flex text-white items-center">
              <FaShoppingCart className="h-5 w-5" />
              
            </Button>

            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 flex items-center justify-center 
                w-5 h-5 text-xs font-bold rounded-full bg-primary text-primary-foreground"
              >
                {totalItems}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
