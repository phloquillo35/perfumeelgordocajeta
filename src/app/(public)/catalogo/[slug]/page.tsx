import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { AddToCart } from "@/components/cart/AddToCart";
import { PLACEHOLDER_IMAGES } from "@/lib/constants";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true },
  });

  if (!product) return { title: "Producto no encontrado" };

  return { title: product.name };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
    },
  }).catch(() => null);

  if (!product) {
    notFound();
  }

  const normalizedProduct = {
    ...product,
    type: product.type as "ARABE" | "DISENADOR",
    variants: product.variants.map((v) => ({
      ...v,
      price: Number(v.price),
    })),
  };

  const imageUrl = product.images[0] || PLACEHOLDER_IMAGES.product(product.type);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: imageUrl,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand || "Sebi Fragrance Decants",
    },
    offers: normalizedProduct.variants.map((v) => ({
      "@type": "Offer",
      priceCurrency: "USD",
      price: v.price,
      availability:
        v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    })),
  };

  return (
    <div className="min-h-screen py-24 bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/catalogo"
            className="text-slate-400 hover:text-gold-300 transition-colors text-sm flex items-center gap-2"
          >
            <span>&larr;</span> Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Main Image Glass Container */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-surface to-surface-sunken flex items-center justify-center p-8">
              <img
                src={imageUrl}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={product.type === "ARABE" ? "arabe" : "disenador"}>
                {product.type === "ARABE" ? "Árabe Exclusivo" : "Diseñador"}
              </Badge>
              {product.featured && (
                <Badge variant="bottle">Colección Destacada</Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">
              {product.name}
            </h1>

            {product.brand && (
              <p className="text-gold-400 text-lg font-medium mb-6 uppercase tracking-wider">
                {product.brand}
              </p>
            )}

            <p className="text-slate-300 leading-relaxed mb-8 font-light text-base">
              {product.description}
            </p>

            {/* Olfactory Notes Card */}
            {product.notes && (
              <div className="glass-card p-6 rounded-2xl mb-8">
                <h2 className="font-serif text-xl gold-text-bright mb-3 flex items-center gap-2">
                  <span>✨</span> Pirámide Olfativa
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{product.notes}</p>
              </div>
            )}

            {/* Performance Indicators */}
            <div className="glass-card p-6 rounded-2xl mb-8 space-y-4">
              <h3 className="font-serif text-lg text-white mb-3">Desempeño en Piel</h3>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Fijación / Duración</span>
                  <span className="text-gold-300 font-semibold">Hasta 12+ Horas</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full w-[90%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Estela & Proyección</span>
                  <span className="text-gold-300 font-semibold">Intensa y Magnética</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full w-[85%]" />
                </div>
              </div>
            </div>

            {/* Presentation Variants — Add to cart */}
            <div className="mb-8">
              <AddToCart
                slug={product.slug}
                name={product.name}
                imageUrl={imageUrl}
                variants={normalizedProduct.variants}
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-5 mb-6 rounded-2xl glass-card text-center">
              <div className="flex flex-col items-center">
                <span className="text-gold-400 text-2xl mb-1">✨</span>
                <span className="text-xs text-white font-medium">100% Originales</span>
                <span className="text-[10px] text-slate-400">Garantía Directa</span>
              </div>
              <div className="flex flex-col items-center border-x border-white/10">
                <span className="text-gold-400 text-2xl mb-1">🧪</span>
                <span className="text-xs text-white font-medium">Decants Puros</span>
                <span className="text-[10px] text-slate-400">Atomizador de Vidrio</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-gold-400 text-2xl mb-1">🚚</span>
                <span className="text-xs text-white font-medium">Envío Seguro</span>
                <span className="text-[10px] text-slate-400">Protección Térmica</span>
              </div>
            </div>

            <WhatsAppButton
              params={{ isGeneric: true }}
              label="Consulta Asesoría Olfativa por WhatsApp"
              variant="outline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
