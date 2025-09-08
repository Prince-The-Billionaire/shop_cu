"use client"
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CartSidebar } from './cart-sidebar'
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
      )
    }
  }, [])
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 lg:py-32 overflow-hidden">
        <CartSidebar/>
        <div className="absolute inset-0 bg-[url(/peach.png)] z-5 no-repeat bg-cover"></div>
        <div className="container flex flex-col items-center justify-center mx-auto px-4 relative z-10">
          <div ref={heroRef} className="text-center flex flex-col items-center justify-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6  bg-orange-300 text-xl font-serif">
              Campus Cart
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-foreground mb-6">
              Shop Smart, Live Better at <span className="text-primary">Covenant University</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif leading-relaxed">
              Your one-stop campus store for electronics, fashion, jewelry, and books. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 font-serif">
                Start Shopping
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-serif bg-transparent">
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero