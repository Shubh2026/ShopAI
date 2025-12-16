import { useState, useRef, useEffect } from "react";
import { Send, Mic, Image as ImageIcon, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { CHAT_SUGGESTIONS, PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product-card";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "product-list";
  products?: typeof PRODUCTS;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI shopping assistant. How can I help you today?",
      type: "text"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content })
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        type: data.products?.length ? "product-list" : "text",
        products: data.products || []
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now.",
          type: "text"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-card rounded-2xl shadow-xl border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-primary/5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-bold">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Always here to help</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pb-4">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.role === "user" ? (
                  <>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ME</AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback className="bg-primary text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="max-w-[85%] space-y-2">
                <div
                  className={`p-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                {message.type === "product-list" &&
                  message.products?.length && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {message.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-2xl">
                Typing...
              </div>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t">
        {messages.length < 3 && (
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {CHAT_SUGGESTIONS.map(s => (
              <Button
                key={s}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask for recommendations..."
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
