"use client"

import type React from "react"

import { useState } from "react"
import { FaStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  description: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addItem, openCart } = useCartStore()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      image: product.image,
      inStock: product.inStock,
    })
    // Optionally open cart after adding item
    setTimeout(() => openCart(), 100)
  }

  const handleOpen = (id:number) =>{
    router.push(`/product/${id}`)
  }

  return (
    <Card onClick={() => handleOpen(product.id)} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50 overflow-hidden">
      <CardHeader className="p-0 relative">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-muted/30">
          <img
            src={imageError ? "/placeholder.svg?height=250&width=300&query=product placeholder" : product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <Badge variant="destructive" className="font-serif text-xs">
                Out of Stock
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="secondary" className="font-serif text-xs">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="w-8 h-8 p-0 rounded-full"
              onClick={(e) => {
                e.preventDefault()
                setIsWishlisted(!isWishlisted)
              }}
            >
              <FaHeart className={`h-3 w-3 ${isWishlisted ? "text-red-500" : ""}`} />
            </Button>
            <Link href={`/product/${product.id}`}>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0 rounded-full">
                <FaEye className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground font-serif uppercase tracking-wide mb-2">{product.category}</p>

        {/* Product Name */}
        <CardTitle className="font-sans text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>

        {/* Description */}
        <CardDescription className="font-serif text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </CardDescription>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-serif">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-sans text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground font-serif line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full font-serif" disabled={!product.inStock} onClick={handleAddToCart}>
          <FaShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  )
}
