import { motion } from "framer-motion";
import { CheckCircle2, Circle, Truck, Package, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import shoesImg from "@assets/stock_images/running_shoes_sneake_61ab4ed5.jpg";

export default function Tracking() {
  const steps = [
    { title: "Order Placed", date: "Dec 12, 9:30 AM", status: "completed", icon: Package },
    { title: "Processing", date: "Dec 12, 2:00 PM", status: "completed", icon: Clock },
    { title: "Shipped", date: "Dec 13, 10:00 AM", status: "completed", icon: Truck },
    { title: "Out for Delivery", date: "Today", status: "current", icon: MapPin },
    { title: "Delivered", date: "Expected by 6 PM", status: "pending", icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Track Order</h1>
        <p className="text-muted-foreground">Order ID: #SH-8293012</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="h-24 w-24 bg-muted rounded-lg overflow-hidden shrink-0">
              <img src={shoesImg} alt="Product" className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Urban Runner Pro</h3>
              <p className="text-muted-foreground">Size: 9 | Color: Black</p>
              <p className="font-bold mt-2">$129.99</p>
            </div>
          </div>
          
          <Separator className="my-6" />

          <div className="relative pl-6 sm:pl-0">
            {/* Vertical line for mobile */}
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-muted sm:hidden" />

            <div className="flex flex-col sm:flex-row justify-between w-full relative">
               {/* Horizontal line for desktop */}
              <div className="hidden sm:block absolute top-4 left-0 right-0 h-0.5 bg-muted z-0" />
              <div 
                className="hidden sm:block absolute top-4 left-0 h-0.5 bg-primary z-0 transition-all duration-1000" 
                style={{ width: "60%" }} 
              />

              {steps.map((step, index) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";
                
                return (
                  <div key={index} className="relative z-10 flex sm:flex-col items-start sm:items-center gap-4 sm:gap-2 mb-8 sm:mb-0">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 shrink-0 bg-background
                        ${isCompleted ? "border-primary bg-primary text-white" : ""}
                        ${isCurrent ? "border-primary text-primary animate-pulse" : ""}
                        ${step.status === "pending" ? "border-muted text-muted-foreground" : ""}
                      `}
                    >
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    
                    <div className="sm:text-center pt-1">
                      <p className={`font-medium text-sm ${isCurrent ? "text-primary font-bold" : ""}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p className="text-foreground font-medium">John Doe</p>
            <p>123 Innovation Drive</p>
            <p>Tech City, CA 94043</p>
            <p>United States</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
             <div className="flex justify-between">
               <span className="text-muted-foreground">Subtotal</span>
               <span>$129.99</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Shipping</span>
               <span className="text-green-600">Free</span>
             </div>
             <div className="flex justify-between">
               <span className="text-muted-foreground">Tax</span>
               <span>$10.40</span>
             </div>
             <Separator className="my-2" />
             <div className="flex justify-between font-bold text-base">
               <span>Total</span>
               <span>$140.39</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
