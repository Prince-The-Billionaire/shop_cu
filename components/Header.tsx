"use client"
import React from "react"
import { Button } from "./ui/button"
import { FaShoppingCart, FaLaptop, FaTshirt, FaGem, FaBook, FaBlog } from "react-icons/fa"
import { useCartStore } from "@/lib/cart-store"

const Header = () => {
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header
      className="fixed left-10 top-1/5 z-50 
      rounded-2xl 
      bg-violet-400/20 
      backdrop-blur-xl 
      border border-white/20 
      shadow-lg shadow-violet-500/20
      "
    >
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-col items-center justify-between space-y-10">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-sans text-lg">S</span>
            </div>
            <span className="text-xl font-bold font-sans text-primary">ShopCU</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex flex-col items-center space-y-6">
            <a
              href="/store?category=electronics"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaLaptop className="text-lg mb-1" />
              Electronics
            </a>
            <a
              href="/store?category=clothes"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaTshirt className="text-lg mb-1" />
              Clothes
            </a>
            <a
              href="/store?category=jewelry"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaGem className="text-lg mb-1" />
              Jewelry
            </a>
            <a
              href="/store?category=books"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaBook className="text-lg mb-1" />
              Books
            </a>
            <a
              href="/blogs"
              className="flex flex-col items-center text-foreground hover:text-primary transition-colors font-serif"
            >
              <FaBlog className="text-lg mb-1" />
              Blogs
            </a>
          </div>

          {/* Cart with badge */}
          <a href="/store" className="relative">
            <Button className="font-serif flex items-center">
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
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
