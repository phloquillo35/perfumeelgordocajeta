import type { WhatsAppParams } from "@/types";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";

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
