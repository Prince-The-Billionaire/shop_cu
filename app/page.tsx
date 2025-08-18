"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FaLaptop, FaTshirt, FaGem, FaBook, FaShoppingCart, FaStar, FaUsers, FaShieldAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { products } from "@/lib/products-data"
import { ProductCard } from "@/components/product-card"

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const { getTotalItems } = useCartStore()
  const totalItems = getTotalItems()

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

    // Categories animation
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

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
          ease: "power2.out",
        },
      )
    }
  }, [])

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

  const features = [
    {
      icon: FaUsers,
      title: "Student Community",
      description: "Built by students, for students at Covenant University",
    },
    {
      icon: FaShieldAlt,
      title: "Secure Shopping",
      description: "Safe and secure payment methods you can trust",
    },
    {
      icon: FaStar,
      title: "Quality Products",
      description: "Carefully curated items at student-friendly prices",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky rounded-2xl top-1 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-sans">S</span>
              </div>
              <span className="text-2xl font-bold font-sans text-primary">ShopCU</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/store?category=electronics"
                className="text-foreground hover:text-primary transition-colors font-serif"
              >
                Electronics
              </a>
              <a
                href="/store?category=clothes"
                className="text-foreground hover:text-primary transition-colors font-serif"
              >
                Clothes
              </a>
              <a
                href="/store?category=jewelry"
                className="text-foreground hover:text-primary transition-colors font-serif"
              >
                Jewelry
              </a>
              <a
                href="/store?category=books"
                className="text-foreground hover:text-primary transition-colors font-serif"
              >
                Books
              </a>
              <a href="/blogs" className="text-foreground hover:text-primary transition-colors font-serif">Blogs</a>
            </div>

            <a href="/store">
              <Button className="font-serif">
                <FaShoppingCart className="mr-2 h-4 w-4" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 font-serif">
              New Semester, New Deals
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-sans text-foreground mb-6">
              Shop Smart, Live Better at <span className="text-primary">Covenant University</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif leading-relaxed">
              Your one-stop campus store for electronics, fashion, jewelry, and books. Designed by students, for
              students.
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

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
              Discover everything you need for campus life, from the latest tech to stylish fashion
            </p>
          </div>

          <div ref={categoriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-foreground mb-4">Why Choose ShopCU?</h2>
            <p className="text-xl text-muted-foreground font-serif max-w-2xl mx-auto">
              We understand student life and have built a platform that serves your unique needs
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-sans text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground font-serif leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 font-serif opacity-90 max-w-2xl mx-auto">
            Join thousands of Covenant University students who trust ShopCU for their campus needs
          </p>
          
          <p className="text-3xl text-left font-bold">Top Sellers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {products.slice(0,4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <a href="/store" className="mt-8">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-serif">
              Explore Store
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold font-sans">S</span>
                </div>
                <span className="text-xl font-bold font-sans text-primary">ShopCU</span>
              </div>
              <p className="text-muted-foreground font-serif">
                Your trusted campus store for all your university needs.
              </p>
            </div>

            <div>
              <h4 className="font-bold font-sans text-foreground mb-4">Categories</h4>
              <ul className="space-y-2 font-serif">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Clothes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Jewelry
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Books
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-sans text-foreground mb-4">Support</h4>
              <ul className="space-y-2 font-serif">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-sans text-foreground mb-4">Connect</h4>
              <ul className="space-y-2 font-serif">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground font-serif">
              © 2024 ShopCU. Made with ❤️ for Covenant University students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
