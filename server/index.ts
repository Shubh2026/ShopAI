import express from "express";
import cors from "cors";
import products from "./products.json" assert { type: "json" };

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.use(cors());
app.use(express.json());

const userMemory = {
  interactions: 0,
  lastCategory: null as string | null,
};

function inferCategoryFromText(text: string) {
  const t = text.toLowerCase();

  if (t.includes("shoe") || t.includes("shoes") || t.includes("run")) {
    return "Shoes";
  }

  if (
    t.includes("watch") ||
    t.includes("electronic") ||
    t.includes("electronics")
  ) {
    return "Electronics";
  }

  if (
    t.includes("bag") ||
    t.includes("accessory") ||
    t.includes("accessories")
  ) {
    return "Accessories";
  }

  return null;
}

/**
 * AI AGENT ENDPOINT (DB-DRIVEN, NO RULES)
 */
app.post("/api/chat", async (req, res) => {
  const rawMessage = req.body.message || "";
  const message = rawMessage.toLowerCase();
  // 🚚 FORCE TRACKING INTENT (LLM-INDEPENDENT)
  if (message.includes("track") || message.includes("order")) {
    return res.json({
      reply: "Your order #SH8293012 is out for delivery today.",
      products: []
    });
  }

  userMemory.interactions += 1;

  let intent: string | null = null;
  let category: string | null = null;

  // 🤖 GEMINI INTENT
  try {
    const prompt = `
Classify the user message for a retail assistant.

Message: "${rawMessage}"

Return JSON only:
{
  "intent": "search" | "upsell" | "track" | "followup",
  "category": string | null
}
`;
    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());

    intent = parsed.intent;
    category = parsed.category;
  } catch {
    // ignore
  }

  // 🧠 FORCE CATEGORY IF GEMINI MISSES
  if (!category) {
    category = inferCategoryFromText(message);
  }

  // 🧠 FOLLOW-UP HANDLING
  if (
    intent === "followup" ||
    message.includes("anything") ||
    message.includes("else")
  ) {
    category = userMemory.lastCategory;
  }

  let matchedProducts: any[] = [];

  if (category) {
    matchedProducts = products.filter(
      (p: any) => p.category.toLowerCase() === category!.toLowerCase()
    );
    userMemory.lastCategory = category;
  }

  if (intent === "track") {
    return res.json({
      reply: "Your order #SH8293012 is out for delivery today."
    });
  }

  res.json({
    reply:
      matchedProducts.length > 0
        ? `Here are some ${category} you might like.`
        : "Try asking for shoes, electronics, or accessories.",
    products: matchedProducts
  });
});

/**
 * START SERVER (WINDOWS SAFE)
 */
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🧠 Retail Agent backend running on port ${PORT}`);
});
