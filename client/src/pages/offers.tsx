import { motion } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { OFFERS } from "@/lib/data";

export default function Offers() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">Exclusive Offers</h1>
        <p className="text-muted-foreground">Handpicked deals just for you</p>
      </div>

      {/* Loyalty Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Loyalty Rewards</h2>
            <p className="text-blue-100">You have <span className="font-bold text-white text-xl">850</span> points</p>
          </div>
          
          <div className="w-full max-w-sm space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Silver Member</span>
              <span>150 points to Gold</span>
            </div>
            <Progress value={85} className="h-3 bg-white/20" indicatorClassName="bg-white" />
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-10">
          <Gift className="h-64 w-64" />
        </div>
      </motion.div>

      {/* Offers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {OFFERS.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-6 flex flex-col h-full gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${offer.color}`}>
                  <Gift className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                  <p className="text-muted-foreground text-sm">{offer.description}</p>
                </div>

                <div className="bg-muted p-3 rounded-lg flex items-center justify-between group">
                  <code className="font-mono font-bold text-primary">{offer.code}</code>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8"
                    onClick={() => copyCode(offer.code, offer.id)}
                  >
                    {copiedId === offer.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
