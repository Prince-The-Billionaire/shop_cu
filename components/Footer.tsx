import React from 'react'

const Footer = () => {
  return (
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
              © 2025 ShopCU. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer