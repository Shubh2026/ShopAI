import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Product } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -5 }}
          className="group relative bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.stock < 20 && (
              <Badge variant="destructive" className="absolute top-3 left-3">
                Only {product.stock} left
              </Badge>
            )}
            {product.tags?.includes("Sale") && (
              <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground hover:bg-accent/90">
                Sale
              </Badge>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                <Star className="h-3.5 w-3.5 fill-current" />
                {product.rating}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold">${product.price}</span>
              <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden gap-0">
        <div className="grid md:grid-cols-2">
          <div className="aspect-square md:aspect-auto bg-muted relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col h-full">
            <DialogHeader className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.tags?.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-transparent"
                  >
                    {tag}
                  </Badge>
                ))}

              </div>
              <DialogTitle className="text-2xl font-heading font-bold">{product.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </DialogHeader>

            <DialogDescription className="text-base mb-6">
              {product.description}
            </DialogDescription>

            <div className="mt-auto space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="py-1 px-3 border-accent/20 text-accent bg-accent/5">
                  Free Delivery
                </Badge>
                <Badge variant="outline" className="py-1 px-3 border-green-500/20 text-green-600 bg-green-50">
                  In Stock: {product.stock}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                <div className="flex gap-3">
                  <Button variant="outline" className="rounded-full">
                    Add to Cart
                  </Button>
                  <Button className="rounded-full px-8">
                    Buy Now
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Why people love it:</h4>
                <p className="text-sm text-muted-foreground italic">"Absolutely love the quality! It fits perfectly and arrived sooner than expected."</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
