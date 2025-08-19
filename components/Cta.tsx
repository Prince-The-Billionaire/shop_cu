import React from 'react'
import { ProductCard } from './product-card'
import { products } from '@/lib/products-data'
import { Button } from './ui/button'

const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 font-serif opacity-90 max-w-2xl mx-auto">
            Join thousands of Covenant University students who trust ShopCU for their campus needs
          </p>
          
          <p className="text-3xl text-left font-bold">Top Sellers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8 gap-6 mt-8">
            {products.slice(0,4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <a href="/store" className="mt-36">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-serif">
              Explore Store
            </Button>
          </a>
        </div>
      </section>
  )
}

export default CTA