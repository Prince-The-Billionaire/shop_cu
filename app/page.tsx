

import Footer from "@/components/Footer"
import CTA from "@/components/Cta"
import Features from "@/components/Features"
import Categories from "@/components/Categories"
import Hero from "@/components/Hero"
import Header from "@/components/Header"


export default function HomePage() {
  
  

  
  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <Hero/>
      
      <Categories/>
      <Features/>
      

      <CTA/>
      <Footer/>
    </div>
  )
}
