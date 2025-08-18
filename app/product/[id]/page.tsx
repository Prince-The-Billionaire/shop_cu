"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { gsap } from "gsap"
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTruck,
  FaShield,
  FaUndo,
} from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoreHeader } from "@/components/store-header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { useCartStore } from "@/lib/cart-store"
import { getProductById, getRelatedProducts } from "@/lib/products-data"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number.parseInt(params.id as string)
  const product = getProductById(productId)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const { addItem, openCart } = useCartStore()
  const pageRef = useRef<HTMLDivElement>(null)
  const imageGalleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <StoreHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold font-sans text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground font-serif mb-6">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/store")} className="font-serif">
            Back to Store
          </Button>
        </div>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product)
  const images = product.images || [product.image]

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        image: product.image,
        inStock: product.inStock,
      })
    }
    openCart()
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <CartSidebar />

      <div ref={pageRef} className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm font-serif">
            <button
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => router.push("/store")}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Store
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={() => router.push(`/store?category=${product.category}`)}
              className="text-muted-foreground hover:text-primary transition-colors capitalize"
            >
              {product.category}
            </button>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div ref={imageGalleryRef} className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden">
              <img
                src={
                  imageError ? "/placeholder.svg?height=500&width=500&query=product image" : images[selectedImageIndex]
                }
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 rounded-full"
                    onClick={prevImage}
                  >
                    <FaChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 rounded-full"
                    onClick={nextImage}
                  >
                    <FaChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {!product.inStock && (
                  <Badge variant="destructive" className="font-serif">
                    Out of Stock
                  </Badge>
                )}
                {discountPercentage > 0 && (
                  <Badge variant="secondary" className="font-serif">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-primary" : "border-border"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-serif capitalize">
                {product.category}
              </Badge>
              {product.brand && <span className="text-sm text-muted-foreground font-serif">by {product.brand}</span>}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-sans text-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-serif">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold font-sans text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground font-serif line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground font-serif leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Key Features */}
            {product.features && (
              <div className="space-y-2">
                <h3 className="font-bold font-sans text-foreground">Key Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground font-serif">
                      <FaCheck className="h-3 w-3 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-serif text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 font-serif">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1 font-serif" disabled={!product.inStock} onClick={handleAddToCart}>
                  <FaShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)} className="px-4">
                  <FaHeart className={`h-4 w-4 ${isWishlisted ? "text-red-500" : ""}`} />
                </Button>

                <Button variant="outline" size="lg" className="px-4 bg-transparent">
                  <FaShare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <FaTruck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-serif font-medium text-foreground">Free Delivery</p>
                  <p className="text-sm text-muted-foreground font-serif">On campus orders</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaShield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-serif font-medium text-foreground">Secure Payment</p>
                  <p className="text-sm text-muted-foreground font-serif">100% protected</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUndo className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-serif font-medium text-foreground">Easy Returns</p>
                  <p className="text-sm text-muted-foreground font-serif">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications" className="font-serif">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="font-serif">
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger value="shipping" className="font-serif">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Product Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border">
                          <span className="font-serif font-medium text-foreground">{key}:</span>
                          <span className="font-serif text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground font-serif">No specifications available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Customer Reviews</CardTitle>
                  <CardDescription className="font-serif">
                    Based on {product.reviews} reviews with an average rating of {product.rating} stars
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Sample Reviews */}
                    {[
                      {
                        name: "Sarah O.",
                        rating: 5,
                        comment: "Excellent quality and fast delivery to campus. Highly recommended!",
                        date: "2 weeks ago",
                      },
                      {
                        name: "Michael A.",
                        rating: 4,
                        comment: "Great product, exactly as described. Good value for money.",
                        date: "1 month ago",
                      },
                      {
                        name: "Grace N.",
                        rating: 5,
                        comment: "Perfect for student life. Very satisfied with my purchase.",
                        date: "1 month ago",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-border pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-medium text-foreground">{review.name}</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating ? "text-yellow-400" : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground font-serif">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground font-serif">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Shipping & Returns</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Delivery Information</h4>
                    <ul className="space-y-1 text-muted-foreground font-serif">
                      <li>• Free delivery to Covenant University campus</li>
                      <li>• Standard delivery: 1-2 business days</li>
                      <li>• Express delivery: Same day (additional charges apply)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif font-medium text-foreground mb-2">Return Policy</h4>
                    <ul className="space-y-1 text-muted-foreground font-serif">
                      <li>• 7-day return policy for unused items</li>
                      <li>• Items must be in original packaging</li>
                      <li>• Free returns for defective products</li>
                      <li>• Refunds processed within 3-5 business days</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-sans text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
