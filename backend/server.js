import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS = [
  { id: 1, name: "Urban Runner Pro", category: "Shoes", price: 129.99 },
  { id: 2, name: "Smart Zenith Watch", category: "Electronics", price: 299.99 }
];

app.post("/api/chat", (req, res) => {
  const message = req.body.message.toLowerCase();

  if (message.includes("track")) {
    return res.json({
      reply: "Your order #SH8293012 is out for delivery and will arrive today."
    });
  }

  if (message.includes("better") || message.includes("upgrade")) {
    return res.json({
      reply: "You may like Smart Zenith Watch with advanced features.",
      products: PRODUCTS.filter(p => p.category === "Electronics")
    });
  }

  if (message.includes("shoe") || message.includes("run")) {
    return res.json({
      reply: "Here are our best running shoes under your budget.",
      products: PRODUCTS.filter(p => p.category === "Shoes")
    });
  }

  return res.json({
    reply:
      "I can help you find products, track orders, or check offers. Try asking about shoes or tracking."
  });
});

app.listen(3001, () =>
  console.log("🧠 Retail Agent backend running on port 3001")
);
