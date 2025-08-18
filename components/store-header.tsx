"use client"

import { useState } from "react"
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"

export function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, toggleCart } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold font-sans">S</span>
            </div>
            <span className="text-2xl font-bold font-sans text-primary">ShopCU</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/store" className="text-foreground hover:text-primary transition-colors font-serif">
              All Products
            </Link>
            <Link
              href="/store?category=electronics"
              className="text-foreground hover:text-primary transition-colors font-serif"
            >
              Electronics
            </Link>
            <Link
              href="/store?category=clothes"
              className="text-foreground hover:text-primary transition-colors font-serif"
            >
              Clothes
            </Link>
            <Link
              href="/store?category=jewelry"
              className="text-foreground hover:text-primary transition-colors font-serif"
            >
              Jewelry
            </Link>
            <Link
              href="/store?category=books"
              className="text-foreground hover:text-primary transition-colors font-serif"
            >
              Books
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex font-serif">
              <FaUser className="mr-2 h-4 w-4" />
              Account
            </Button>

            <Button className="font-serif relative" onClick={toggleCart}>
              <FaShoppingCart className="mr-2 h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/store" className="text-foreground hover:text-primary transition-colors font-serif py-2">
                All Products
              </Link>
              <Link
                href="/store?category=electronics"
                className="text-foreground hover:text-primary transition-colors font-serif py-2"
              >
                Electronics
              </Link>
              <Link
                href="/store?category=clothes"
                className="text-foreground hover:text-primary transition-colors font-serif py-2"
              >
                Clothes
              </Link>
              <Link
                href="/store?category=jewelry"
                className="text-foreground hover:text-primary transition-colors font-serif py-2"
              >
                Jewelry
              </Link>
              <Link
                href="/store?category=books"
                className="text-foreground hover:text-primary transition-colors font-serif py-2"
              >
                Books
              </Link>
              <Button variant="ghost" size="sm" className="justify-start font-serif py-2">
                <FaUser className="mr-2 h-4 w-4" />
                Account
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
