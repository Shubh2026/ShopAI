import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/product-card";
import { PRODUCTS } from "@/lib/data";

export default function Products() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={category} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter(c => c !== category));
                  }
                }}
              />
              <Label htmlFor={category} className="text-sm font-normal cursor-pointer">{category}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium text-sm">Price Range (${priceRange[0]} - ${priceRange[1]})</h3>
        <Slider 
          defaultValue={[0, 500]} 
          max={500} 
          step={10} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-sm">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="instock" />
          <Label htmlFor="instock" className="text-sm font-normal">In Stock Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="onsale" />
          <Label htmlFor="onsale" className="text-sm font-normal">On Sale</Label>
        </div>
      </div>
      
      <Button className="w-full" onClick={() => {
        setSelectedCategories([]);
        setPriceRange([0, 500]);
      }} variant="outline">
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Browse Products</h1>
          <p className="text-muted-foreground">Find the best deals curated for you.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex-1">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          <Select defaultValue="featured">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block w-64 shrink-0 bg-card p-6 rounded-xl border h-fit sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <SlidersHorizontal className="h-5 w-5" />
            <h2 className="font-bold">Filters</h2>
          </div>
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Filter className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
