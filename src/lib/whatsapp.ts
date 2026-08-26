import type { WhatsAppParams } from "@/types";

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
