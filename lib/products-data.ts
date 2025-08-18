export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images?: string[]
  rating: number
  reviews: number
  inStock: boolean
  description: string
  longDescription?: string
  specifications?: Record<string, string>
  features?: string[]
  brand?: string
  sku?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "MacBook Air M2",
    price: 450000,
    originalPrice: 500000,
    category: "electronics",
    image: "/macbook-air-purple.png",
    images: ["/macbook-air-purple.png", "/macbook-air-purple.png", "/macbook-air-purple.png"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Perfect for students - lightweight and powerful",
    longDescription:
      "The MacBook Air M2 is the perfect laptop for Covenant University students. With its lightweight design and powerful M2 chip, you can handle everything from research papers to video editing with ease. The all-day battery life means you won't need to worry about finding power outlets between classes.",
    brand: "Apple",
    sku: "MBA-M2-2024",
    specifications: {
      Processor: "Apple M2 chip",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
      Display: "13.6-inch Liquid Retina",
      Battery: "Up to 18 hours",
      Weight: "1.24 kg",
    },
    features: [
      "M2 chip for incredible performance",
      "All-day battery life",
      "Stunning Liquid Retina display",
      "Advanced camera and audio",
      "Lightweight and portable design",
    ],
  },
  {
    id: 2,
    name: "iPhone 15",
    price: 380000,
    category: "electronics",
    image: "/iphone-15-purple.png",
    images: ["/iphone-15-purple.png", "/iphone-15-purple.png", "/iphone-15-purple.png"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    description: "Latest iPhone with amazing camera",
    longDescription:
      "Stay connected with fellow students and capture every moment of your university experience with the iPhone 15. The advanced camera system lets you take stunning photos for your projects and social media, while the powerful A16 Bionic chip ensures smooth performance for all your apps.",
    brand: "Apple",
    sku: "IPH-15-128",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Chip: "A16 Bionic",
      Storage: "128GB",
      Camera: "48MP Main + 12MP Ultra Wide",
      Battery: "Up to 20 hours video playback",
      Connectivity: "5G, Wi-Fi 6",
    },
    features: [
      "48MP Main camera with 2x Telephoto",
      "A16 Bionic chip",
      "All-day battery life",
      "Dynamic Island",
      "USB-C connectivity",
    ],
  },
  {
    id: 3,
    name: "Covenant University Hoodie",
    price: 8500,
    category: "clothes",
    image: "/cu-hoodie-purple.png",
    images: ["/cu-hoodie-purple.png", "/cu-hoodie-purple.png", "/cu-hoodie-purple.png"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    description: "Official CU merchandise - premium quality",
    longDescription:
      "Show your Covenant University pride with this premium quality hoodie. Made from soft, durable materials, it's perfect for those cool mornings on campus or cozy study sessions in the library. The official CU design makes it a must-have for every student.",
    brand: "CU Official",
    sku: "CU-HOODIE-PUR",
    specifications: {
      Material: "80% Cotton, 20% Polyester",
      Fit: "Regular fit",
      Care: "Machine washable",
      Sizes: "S, M, L, XL, XXL",
      Color: "Purple with white logo",
      Weight: "450g",
    },
    features: [
      "Official Covenant University design",
      "Premium cotton-polyester blend",
      "Comfortable regular fit",
      "Durable construction",
      "Machine washable",
    ],
  },
  {
    id: 4,
    name: "Student Backpack",
    price: 12000,
    originalPrice: 15000,
    category: "clothes",
    image: "/student-backpack-purple.png",
    images: ["/student-backpack-purple.png", "/student-backpack-purple.png", "/student-backpack-purple.png"],
    rating: 4.6,
    reviews: 203,
    inStock: true,
    description: "Spacious and durable for campus life",
    longDescription:
      "This spacious student backpack is designed specifically for university life. With multiple compartments for your laptop, books, and personal items, plus a comfortable padded design, it's the perfect companion for your daily campus activities.",
    brand: "Campus Gear",
    sku: "SB-PURPLE-L",
    specifications: {
      Capacity: "35 liters",
      "Laptop Compartment": "Up to 15.6 inches",
      Material: "Water-resistant polyester",
      Dimensions: "45 x 32 x 18 cm",
      Weight: "1.2 kg",
      Warranty: "2 years",
    },
    features: [
      "Dedicated laptop compartment",
      "Multiple organizational pockets",
      "Water-resistant material",
      "Comfortable padded straps",
      "Durable construction",
    ],
  },
  {
    id: 5,
    name: "Silver Chain Necklace",
    price: 25000,
    category: "jewelry",
    image: "/silver-chain-necklace.png",
    images: ["/silver-chain-necklace.png", "/silver-chain-necklace.png", "/silver-chain-necklace.png"],
    rating: 4.5,
    reviews: 67,
    inStock: true,
    description: "Elegant sterling silver chain",
    longDescription:
      "Add a touch of elegance to your campus style with this beautiful sterling silver chain necklace. Perfect for both casual and formal occasions, it's a versatile piece that complements any outfit while maintaining a sophisticated look.",
    brand: "Silver Style",
    sku: "SSN-CHAIN-18",
    specifications: {
      Material: "925 Sterling Silver",
      Length: "18 inches",
      "Chain Type": "Cable chain",
      Clasp: "Spring ring clasp",
      Weight: "8.5g",
      Care: "Polish with silver cloth",
    },
    features: [
      "Genuine 925 sterling silver",
      "Hypoallergenic",
      "Tarnish resistant",
      "Secure spring ring clasp",
      "Perfect everyday wear",
    ],
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 45000,
    category: "jewelry",
    image: "/smart-watch-purple.png",
    images: ["/smart-watch-purple.png", "/smart-watch-purple.png", "/smart-watch-purple.png"],
    rating: 4.4,
    reviews: 91,
    inStock: false,
    description: "Track your fitness and stay connected",
    longDescription:
      "Stay on top of your health and connected to what matters most with this advanced smartwatch. Perfect for busy students, it tracks your fitness, monitors your health, and keeps you connected with smart notifications.",
    brand: "TechFit",
    sku: "SW-PURPLE-44",
    specifications: {
      Display: "1.4-inch AMOLED",
      "Battery Life": "Up to 7 days",
      "Water Resistance": "5ATM",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Sensors: "Heart rate, SpO2, GPS",
      Compatibility: "iOS and Android",
    },
    features: [
      "Advanced health monitoring",
      "GPS tracking",
      "7-day battery life",
      "Water resistant design",
      "Smart notifications",
    ],
  },
  {
    id: 7,
    name: "Engineering Mathematics",
    price: 3500,
    category: "books",
    image: "/engineering-math-book.png",
    images: ["/engineering-math-book.png", "/engineering-math-book.png", "/engineering-math-book.png"],
    rating: 4.3,
    reviews: 78,
    inStock: true,
    description: "Essential textbook for engineering students",
    longDescription:
      "Master the mathematical foundations of engineering with this comprehensive textbook. Covering all essential topics from calculus to differential equations, it's designed specifically for engineering students at Covenant University.",
    brand: "Academic Press",
    sku: "ENG-MATH-2024",
    specifications: {
      Pages: "856 pages",
      Edition: "5th Edition",
      Language: "English",
      Publisher: "Academic Press",
      ISBN: "978-0123456789",
      Format: "Paperback",
    },
    features: [
      "Comprehensive coverage of engineering mathematics",
      "Step-by-step problem solutions",
      "Practice exercises with answers",
      "Real-world engineering applications",
      "Updated 5th edition content",
    ],
  },
  {
    id: 8,
    name: "Business Strategy Guide",
    price: 4200,
    category: "books",
    image: "/business-strategy-book.png",
    images: ["/business-strategy-book.png", "/business-strategy-book.png", "/business-strategy-book.png"],
    rating: 4.6,
    reviews: 45,
    inStock: true,
    description: "Comprehensive guide for business students",
    longDescription:
      "Develop strategic thinking skills with this comprehensive business strategy guide. Perfect for business students, it covers modern strategic frameworks, case studies, and practical applications in today's dynamic business environment.",
    brand: "Business Books Ltd",
    sku: "BSG-2024-ED",
    specifications: {
      Pages: "624 pages",
      Edition: "3rd Edition",
      Language: "English",
      Publisher: "Business Books Ltd",
      ISBN: "978-0987654321",
      Format: "Hardcover",
    },
    features: [
      "Modern strategic frameworks",
      "Real business case studies",
      "Interactive exercises",
      "Digital resources included",
      "Expert author insights",
    ],
  },
]

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getRelatedProducts = (product: Product, limit = 4): Product[] => {
  return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, limit)
}
