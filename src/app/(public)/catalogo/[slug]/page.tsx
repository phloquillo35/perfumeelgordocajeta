import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui";
import { WhatsAppButton } from "@/components/features/WhatsAppButton";
import { formatPrice } from "@/lib/utils";
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

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/catalogo"
            className="text-midnight-400 hover:text-gold-400 transition-colors text-sm"
          >
            &larr; Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-midnight-900 via-black to-midnight-950 border border-midnight-700/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
            <img
              src={imageUrl}
              alt={product.name}
              loading="lazy"
              className="relative z-[1] w-full h-full object-contain p-12"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={product.type === "ARABE" ? "arabe" : "disenador"}>
                {product.type === "ARABE" ? "Árabe" : "Diseñador"}
              </Badge>
              {product.featured && (
                <Badge variant="bottle">Destacado</Badge>
              )}
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">
              {product.name}
            </h1>

            {product.brand && (
              <p className="text-gold-400 text-lg font-medium mb-6">
                {product.brand}
              </p>
            )}

            <p className="text-midnight-200 leading-relaxed mb-8">
              {product.description}
            </p>

            {product.notes && (
              <div className="mb-8">
                <h2 className="font-serif text-xl text-white mb-3">Notas</h2>
                <p className="text-midnight-300 leading-relaxed">{product.notes}</p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              {normalizedProduct.variants
                .filter((v) => v.type === "BOTTLE")
                .map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-midnight-800/40 border border-midnight-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Badge variant="bottle">Botella</Badge>
                        <span className="text-midnight-300 text-sm ml-3">{variant.ml}ml</span>
                      </div>
                      <span className="text-2xl font-serif text-gold-400">
                        {formatPrice(variant.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${variant.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                        {variant.stock > 0 ? "En stock" : "Agotado"}
                      </span>
                      <WhatsAppButton
                        params={{
                          productName: product.name,
                          variantType: "BOTTLE",
                          ml: variant.ml,
                          price: variant.price,
                        }}
                        label="Consultar por WhatsApp"
                      />
                    </div>
                  </div>
                ))}

              {normalizedProduct.variants
                .filter((v) => v.type === "DECANT")
                .map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-midnight-800/40 border border-midnight-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Badge variant="decant">Decant</Badge>
                        <span className="text-midnight-300 text-sm ml-3">{variant.ml}ml</span>
                      </div>
                      <span className="text-2xl font-serif text-gold-400">
                        {formatPrice(variant.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${variant.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                        {variant.stock > 0 ? "En stock" : "Agotado"}
                      </span>
                      <WhatsAppButton
                        params={{
                          productName: product.name,
                          variantType: "DECANT",
                          ml: variant.ml,
                          price: variant.price,
                        }}
                        label="Consultar por WhatsApp"
                      />
                    </div>
                  </div>
                ))}
            </div>

            <WhatsAppButton
              params={{ isGeneric: true }}
              label="Consulta Genérica por WhatsApp"
              variant="outline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
