import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, ShoppingBag, Tag } from "lucide-react";
import { Link } from "wouter";
import robotImg from "@assets/generated_images/friendly_3d_ai_robot_shopping_assistant_floating_near_shopping_bags.png";
import bgImg from "@assets/generated_images/abstract_geometric_background_with_shopping_elements.png";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product-card";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/10">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={bgImg} alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
          <div className="space-y-6 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
                Your AI Shopping <span className="text-primary">Assistant</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              Personalized recommendations. Smart offers. Seamless shopping. Experience the future of retail today.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/chat">
                <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/25">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Start Chat
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 bg-background/50 backdrop-blur-sm">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[400px] h-[400px]">
              <motion.img 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={robotImg} 
                alt="AI Assistant" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Recommended for You</h2>
          <Link href="/products">
            <Button variant="ghost" className="text-primary">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories / Promo Banner */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold">Summer Collection</h3>
            <p className="text-blue-50">Up to 50% off on new arrivals</p>
            <Button variant="secondary" className="rounded-full">Shop Now</Button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
            <ShoppingBag className="h-64 w-64" />
          </div>
        </div>
        
        <div className="rounded-2xl p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold">Tech Gadgets</h3>
            <p className="text-purple-50">Latest electronics at best prices</p>
            <Button variant="secondary" className="rounded-full">Explore</Button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
            <Tag className="h-64 w-64" />
          </div>
        </div>
      </section>
    </div>
  );
}
