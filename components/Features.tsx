"use client"
import React, { useEffect, useRef } from 'react'
import { FaShieldAlt, FaStar, FaUsers } from 'react-icons/fa'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
const Features = () => {
    const featuresRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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
    },[])

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
  )
}

export default Features