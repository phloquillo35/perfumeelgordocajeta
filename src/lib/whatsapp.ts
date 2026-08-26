import type { WhatsAppParams } from "@/types";
import type { CartItem } from "./cart";

export const WHATSAPP_PHONE = (process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "").trim();

const PHONE_NUMBER = WHATSAPP_PHONE;

function buildMessage(params: WhatsAppParams): string {
  if (params.isGeneric) {
    return "Hola, me gustaría recibir información sobre sus perfumes.";
  }

  const typeLabel = params.variantType === "BOTTLE" ? "Botella" : "Decant";
  const sizeLabel = params.ml ? ` - ${params.ml}ml` : "";
  const priceLabel = params.price ? ` - $${params.price}` : "";

  return (
    `Hola, me interesa el perfume *${params.productName}*` +
    ` en presentación *${typeLabel}${sizeLabel}*${priceLabel}.` +
    ` ¿Podrían darme más información?`
  );
}

export function getWhatsAppLink(params: WhatsAppParams): string {
  const message = buildMessage(params);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
}

export interface CartItemWhatsApp {
  productName: string;
  variantType: "BOTTLE" | "DECANT";
  ml: number;
  price: number;
  quantity: number;
}

export function buildCartWhatsAppMessage(items: CartItemWhatsApp[], total: number): string {
  if (items.length === 0) {
    return "Hola, me gustaría recibir información sobre su catálogo de perfumes.";
  }

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.productName}* (${item.variantType === "BOTTLE" ? "Botella" : "Decant"} ${item.ml}ml) x${item.quantity} — $${(item.price * item.quantity).toLocaleString()}`
    )
    .join("\n");

  return (
    `✨ *NUEVO PEDIDO - SEBI FRAGRANCE DECANTS* ✨\n\n` +
    `Hola! Me interesa comprar los siguientes perfumes:\n\n` +
    `${itemsList}\n\n` +
    `💳 *Total Estimado:* $${total.toLocaleString()}\n\n` +
    `¿Podrían confirmarme disponibilidad y datos para el pago/envío?`
  );
}

export function getCartWhatsAppLink(items: CartItemWhatsApp[], total: number): string {
  const message = buildCartWhatsAppMessage(items, total);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
}

export interface CheckoutCustomer {
  name: string;
  address: string;
  phone: string;
}

const ORIGIN =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://sebi-fragrance-decants.vercel.app";

export function buildCheckoutWhatsAppMessage(
  customer: CheckoutCustomer,
  items: CartItem[]
): string {
  if (items.length === 0) return "Hola, quisiera hacer un pedido.";
  const lines = items
    .map((it, i) => {
      const tipo = it.variantType === "BOTTLE" ? "Botella" : "Decant";
      const url = `${ORIGIN}/catalogo/${it.slug}`;
      return `${i + 1}. *${it.name}* — ${tipo} ${it.ml}ml x${it.quantity} — $${(
        it.price * it.quantity
      ).toLocaleString()}\n   ${url}`;
    })
    .join("\n");
  const total = items.reduce((s, it) => s + it.price * it.quantity, 0);
  return (
    `✨ *NUEVO PEDIDO — SEBI FRAGRANCE DECANTS* ✨\n\n` +
    `Hola, soy *${customer.name}*. Quiero hacer el siguiente pedido:\n\n` +
    `${lines}\n\n` +
    `📍 *Dirección:* ${customer.address}\n` +
    `📞 *Teléfono:* ${customer.phone}\n` +
    `💳 *Total Estimado:* $${total.toLocaleString()}\n\n` +
    `¿Podrían confirmarme disponibilidad y coordinar el envío?`
  );
}

export function getCheckoutWhatsAppLink(
  customer: CheckoutCustomer,
  items: CartItem[]
): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    buildCheckoutWhatsAppMessage(customer, items)
  )}`;
}
