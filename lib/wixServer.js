import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

const clientId =
  process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "b1f5ef54-e6e1-4aa2-884f-78de24c3ad62";

const wixServer = createClient({
  modules: { products },
  auth: OAuthStrategy({ clientId }),
});

export async function getProducts() {
  try {
    const res = await wixServer.products.queryProducts().find();
    return res.items || [];
  } catch (e) {
    console.error("server products", e?.message || e);
    return [];
  }
}

export async function getProductBySlug(slug) {
  try {
    const res = await wixServer.products.queryProducts().eq("slug", slug).find();
    return res.items?.[0] || null;
  } catch (e) {
    console.error("server product", e?.message || e);
    return null;
  }
}
