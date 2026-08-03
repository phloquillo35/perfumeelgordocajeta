export const PLACEHOLDER_IMAGES = {
  product: (type: string) =>
    type === "ARABE"
      ? "/images/arabe.webp"
      : "/images/disenador.webp",
  category: {
    arabe: "/images/arabe.webp",
    disenador: "/images/disenador.webp",
  },
} as const;
