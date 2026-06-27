import { cache } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../lib/wixServer";
import { SITE } from "../../../lib/site";
import ProductDetail from "./ProductDetail";

const big = (u, s = 1200) => (u ? u.replace(/\/w_\d+,h_\d+,/, `/w_${s},h_${s},`) : u);
const plain = (html) => (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const getProduct = cache((slug) => getProductBySlug(decodeURIComponent(slug)));

export async function generateMetadata({ params }) {
  const p = await getProduct(params.slug);
  if (!p) return { title: "Producto no encontrado" };
  const description = plain(p.description).slice(0, 160) || `${p.name} · ${SITE.brand}`;
  const image = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean)[0];
  const canonical = `/product/${p.slug}`;
  return {
    title: p.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: p.name,
      description,
      url: `${SITE.url}${canonical}`,
      siteName: SITE.brand,
      images: image ? [{ url: big(image), width: 1200, height: 1200, alt: p.name }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: p.name,
      description,
      images: image ? [big(image)] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const p = await getProduct(params.slug);
  if (!p) notFound();

  const gallery = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const price = p.price?.price;
  const disc = p.price?.discountedPrice;
  const hasDisc = disc != null && disc < price;
  const inStock = p.stock?.inStock !== false && p.stock?.inventoryStatus !== "OUT_OF_STOCK";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: plain(p.description) || p.name,
    image: gallery.map((g) => big(g)),
    ...(p.sku ? { sku: p.sku } : {}),
    brand: { "@type": "Brand", name: SITE.brand },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/product/${p.slug}`,
      priceCurrency: p.price?.currency || "EUR",
      price: (hasDisc ? disc : price) ?? 0,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={p} />
    </>
  );
}
