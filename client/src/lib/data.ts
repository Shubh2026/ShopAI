import shoesImg from "@assets/stock_images/running_shoes_sneake_61ab4ed5.jpg";
import watchImg from "@assets/stock_images/smart_watch_product__afc5f723.jpg";
import backpackImg from "@assets/stock_images/stylish_backpack_pro_4ee4a397.jpg";
import headphonesImg from "@assets/stock_images/wireless_headphones__d9140554.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  tags: string[];
  description: string;
  stock: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Urban Runner Pro",
    price: 129.99,
    rating: 4.8,
    reviews: 245,
    category: "Shoes",
    image: shoesImg,
    tags: ["Best Seller", "New Arrival"],
    description: "High-performance running shoes designed for comfort and speed.",
    stock: 34,
  },
  {
    id: "2",
    name: "Smart Zenith Watch",
    price: 299.99,
    rating: 4.9,
    reviews: 189,
    category: "Electronics",
    image: watchImg,
    tags: ["Top Pick", "Tech"],
    description: "Advanced smartwatch with health tracking and seamless connectivity.",
    stock: 12,
  },
  {
    id: "3",
    name: "Nomad Travel Backpack",
    price: 89.50,
    rating: 4.6,
    reviews: 56,
    category: "Accessories",
    image: backpackImg,
    tags: ["Durable", "Travel"],
    description: "Water-resistant backpack with dedicated laptop compartment.",
    stock: 56,
  },
  {
    id: "4",
    name: "Sonic Bass Wireless",
    price: 159.00,
    rating: 4.7,
    reviews: 312,
    category: "Electronics",
    image: headphonesImg,
    tags: ["Sale", "Audio"],
    description: "Premium noise-cancelling headphones with 30-hour battery life.",
    stock: 8,
  },
  {
    id: "5",
    name: "Street Style Sneakers",
    price: 79.99,
    rating: 4.3,
    reviews: 89,
    category: "Shoes",
    image: shoesImg, // Reusing for mock
    tags: ["Trending"],
    description: "Casual sneakers perfect for everyday wear.",
    stock: 110,
  },
  {
    id: "6",
    name: "Pro Audio Headset",
    price: 199.99,
    rating: 4.9,
    reviews: 50,
    category: "Electronics",
    image: headphonesImg, // Reusing
    tags: ["Premium"],
    description: "Studio-quality sound for professionals.",
    stock: 5,
  }
];

export const OFFERS = [
  {
    id: 1,
    title: "Summer Sale",
    description: "Get 20% off on all footwear",
    code: "SUMMER20",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "On orders above $50",
    code: "FREESHIP",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Loyalty Bonus",
    description: "Double points on electronics",
    code: "TECH2X",
    color: "bg-purple-100 text-purple-700",
  },
];

export const CHAT_SUGGESTIONS = [
  "Show me running shoes under ",
  "I need a watch for my brother",
  "Are there any deals on headphones?",
  "Track my last order",
];
