"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  useEffect(() => {
    if (isOpen) {
      // Show overlay and sidebar
      gsap.set([overlayRef.current, sidebarRef.current], { display: "block" })
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(sidebarRef.current, { x: "100%" }, { x: "0%", duration: 0.4, ease: "power3.out" })
    } else {
      // Hide overlay and sidebar
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 })
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          gsap.set([overlayRef.current, sidebarRef.current], { display: "none" })
        },
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
        style={{ display: "none" }}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
        style={{ display: "none" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold font-sans text-foreground">Shopping Cart</h2>
          <Button variant="ghost" size="sm" onClick={closeCart}>
            <FaTimes className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold font-sans text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground font-serif mb-6">Add some products to get started</p>
              <Button onClick={closeCart} className="font-serif">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card rounded-lg border border-border">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md bg-muted"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-sans font-medium text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground font-serif capitalize">{item.category}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <FaMinus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-serif">{item.quantity}</span>

                        <Button
                          size="sm"
                          variant="outline"
                          className="w-8 h-8 p-0 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <FaPlus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <FaTrash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold font-sans text-foreground">{formatPrice(item.price * item.quantity)}</p>
                    {item.originalPrice && (
                      <p className="text-sm text-muted-foreground font-serif line-through">
                        {formatPrice(item.originalPrice * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold font-sans">
              <span>Total:</span>
              <span className="text-primary">{formatPrice(getTotalPrice())}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full font-serif" size="lg">
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full font-serif bg-transparent" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
