import { Link, useLocation } from "wouter";
import { Home, MessageSquare, ShoppingBag, Tag, Truck, User, Search, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Browse", icon: ShoppingBag, path: "/products" },
    { label: "Assistant", icon: MessageSquare, path: "/chat" },
    { label: "Offers", icon: Tag, path: "/offers" },
    { label: "Track", icon: Truck, path: "/tracking" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <a 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          location === item.path 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <Link href="/admin">
                    <a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      Admin Dashboard
                    </a>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/">
              <a className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <span className="font-heading font-bold text-xl hidden sm:inline-block">ShopAI</span>
              </a>
            </Link>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:bg-background transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`p-2 rounded-full transition-colors ${
                      location === item.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    title={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                </Link>
              ))}
            </nav>
            <div className="h-6 w-px bg-border hidden md:block" />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 px-6 py-2 flex justify-between items-center pb-safe">
        {navItems.slice(0, 4).map((item) => (
          <Link key={item.path} href={item.path}>
            <a
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                location === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}
