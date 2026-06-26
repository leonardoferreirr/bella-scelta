"use client";

import Cookies from "js-cookie";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

// Wix Stores app id (global, igual para todas as lojas Wix Stores)
export const STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";

// Client ID público do OAuth app headless (não é segredo). Fallback p/ deploy 1-clique.
const clientId =
  process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "b1f5ef54-e6e1-4aa2-884f-78de24c3ad62";

export const wixClient = createClient({
  modules: { products, currentCart, redirects },
  auth: OAuthStrategy({
    clientId,
    tokens: JSON.parse(
      Cookies.get("session") || '{"accessToken": {}, "refreshToken": {}}'
    ),
  }),
});

export { currentCart };
