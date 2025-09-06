"use client"
import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { FaLaptop, FaTshirt, FaGem, FaBook } from 'react-icons/fa'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const Categories = () => {
    const categoriesRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (categoriesRef.current) {
              gsap.fromTo(
                categoriesRef.current.children,
                { opacity: 0, scale: 0.8 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  stagger: 0.1,
                  scrollTrigger: {
                    trigger: categoriesRef.current,
                    start: "top 80%",
                  },
                  ease: "back.out(1.7)",
                },
              )
            }
    },[])

    const categories = [
    {
      icon: FaLaptop,
      title: "Electronics",
      description: "Laptops, phones, accessories & tech gear",
      image: "/modern-devices-purple.png",
      count: "150+ items",
    },
    {
      icon: FaTshirt,
      title: "Clothes",
      description: "Trendy fashion for campus life",
      image: "/stylish-university-clothing.png",
      count: "200+ items",
    },
    {
      icon: FaGem,
      title: "Jewelry",
      description: "Elegant accessories & watches",
      image: "/student-jewelry-watches.png",
      count: "80+ items",
    },
    {
      icon: FaBook,
      title: "Books",
      description: "Textbooks, novels & study materials",
      image: "/university-textbooks-stack.png",
      count: "300+ items",
    },
  ]
  return (
    <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Shop by <span className='text-primary'>Category</span> </h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              Discover everything you need for campus life, from the latest tech to stylish fashion
            </p>
          </div>

          <div ref={categoriesRef} className="md:px-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <a key={index} href={`/store?category=${category.title.toLowerCase()}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50">
                    <CardHeader className="pb-4">
                      <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm font-serif">
                          {category.count}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                        </div>
                        <CardTitle className="font-sans text-foreground">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-serif text-muted-foreground">
                        {category.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </div>
        </div>
      </section>
  )
}

export default Categories