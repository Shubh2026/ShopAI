export function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("track") || t.includes("order"))
    return "TRACK_ORDER";

  if (t.includes("deal") || t.includes("discount") || t.includes("offer"))
    return "DEALS";

  if (t.includes("better") || t.includes("upgrade"))
    return "UPSELL";

  if (
    t.includes("show") ||
    t.includes("find") ||
    t.includes("recommend") ||
    t.includes("under")
  )
    return "FIND_PRODUCT";

  return "GENERAL";
}
