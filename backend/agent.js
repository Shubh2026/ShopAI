import { detectIntent } from "./intents.js";
import { products } from "./products.js";
import { lastOrder } from "./orders.js";

export async function handleAgentMessage(message) {
  const intent = detectIntent(message);

  switch (intent) {
    case "FIND_PRODUCT":
      return recommendProduct(message);

    case "UPSELL":
      return upsellProduct();

    case "DEALS":
      return showDeals();

    case "TRACK_ORDER":
      return trackOrder();

    default:
      return generalHelp();
  }
}

function recommendProduct(message) {
  const product = products.find(p => p.category === "shoes");

  return {
    reply: `I recommend **${product.name}** priced at $${product.price}. It's one of our top-rated products.`,
    highlightProduct: product.id
  };
}

function upsellProduct() {
  const product = products.find(p => p.price > 150);

  return {
    reply: `If you'd like an upgrade, consider **${product.name}** with a ${product.rating}⭐ rating.`,
    highlightProduct: product.id
  };
}

function showDeals() {
  return {
    reply:
      "You have a **20% Summer Sale** on footwear and **Free Shipping** on orders above $50.",
  };
}

function trackOrder() {
  return {
    reply: `Your order **${lastOrder.orderId}** (${lastOrder.product}) is currently **${lastOrder.status}**. ETA: ${lastOrder.eta}.`
  };
}

function generalHelp() {
  return {
    reply:
      "I can help you find products, track orders, or discover exclusive deals. What would you like to do?"
  };
}
