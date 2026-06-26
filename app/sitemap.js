import { SITE } from "../lib/site";
import { getProducts } from "../lib/wixServer";

const ROUTES = ["", "/envios", "/contacto", "/aviso-legal", "/privacidad", "/terminos", "/cookies"];

export default async function sitemap() {
  const base = SITE.url;
  const now = new Date();

  const staticEntries = ROUTES.map((r) => ({
    url: `${base}${r || "/"}`,
    lastModified: now,
    changeFrequency: r === "" ? "daily" : "monthly",
    priority: r === "" ? 1 : 0.5,
  }));

  let productEntries = [];
  try {
    const products = await getProducts();
    productEntries = (products || [])
      .filter((p) => p && p.slug)
      .map((p) => ({
        url: `${base}/product/${p.slug}`,
        lastModified: p.lastUpdated ? new Date(p.lastUpdated) : now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));
  } catch {
    productEntries = [];
  }

  return [...staticEntries, ...productEntries];
}
