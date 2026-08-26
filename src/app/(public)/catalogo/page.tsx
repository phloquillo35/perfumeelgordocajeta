import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/features/ProductCard";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { category: true; variants: true }
}>;

export const metadata: Metadata = {
  title: "Catálogo",
};

interface CatalogPageProps {
  searchParams: Promise<{
    tipo?: string;
    presentacion?: string;
    search?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const tipo = params.tipo as "ARABE" | "DISENADOR" | undefined;
  const presentacion = params.presentacion as "BOTTLE" | "DECANT" | undefined;
  const search = params.search;

  const where: Record<string, unknown> = {
    ...(tipo && { type: tipo }),
    ...(presentacion && { variants: { some: { type: presentacion } } }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  let products: ProductWithRelations[] = [];
  let dbError = false;

  try {
    products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbError = true;
  }

  const hasFilters = tipo || presentacion || search;

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-midnight-400 hover:text-gold-400 transition-colors text-sm"
          >
            &larr; Volver al inicio
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Catálogo
          </h1>
          <p className="text-midnight-300 max-w-2xl mx-auto">
            Explora nuestra colección completa de fragancias árabes y de diseñador
          </p>
        </div>

        <form
          method="GET"
          action="/catalogo"
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Buscar perfumes..."
              className="w-full sm:w-80 px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50"
            />
            <div className="flex gap-2">
              <Link
                href="/catalogo"
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  !hasFilters
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-midnight-800/40 text-midnight-300 border border-midnight-700/50 hover:border-midnight-500"
                }`}
              >
                Todos
              </Link>
              <Link
                href={`/catalogo?tipo=ARABE${presentacion ? `&presentacion=${presentacion}` : ""}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  tipo === "ARABE"
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-midnight-800/40 text-midnight-300 border border-midnight-700/50 hover:border-midnight-500"
                }`}
              >
                Árabes
              </Link>
              <Link
                href={`/catalogo?tipo=DISENADOR${presentacion ? `&presentacion=${presentacion}` : ""}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  tipo === "DISENADOR"
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-midnight-800/40 text-midnight-300 border border-midnight-700/50 hover:border-midnight-500"
                }`}
              >
                Diseñador
              </Link>
              <Link
                href={`/catalogo?presentacion=BOTTLE${tipo ? `&tipo=${tipo}` : ""}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  presentacion === "BOTTLE"
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-midnight-800/40 text-midnight-300 border border-midnight-700/50 hover:border-midnight-500"
                }`}
              >
                Botella
              </Link>
              <Link
                href={`/catalogo?presentacion=DECANT${tipo ? `&tipo=${tipo}` : ""}${search ? `&search=${search}` : ""}`}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  presentacion === "DECANT"
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "bg-midnight-800/40 text-midnight-300 border border-midnight-700/50 hover:border-midnight-500"
                }`}
              >
                Decant
              </Link>
            </div>
          </div>
        </form>

        {dbError ? (
          <div className="text-center py-20">
            <p className="text-midnight-400 text-lg mb-2">Error de conexión con la base de datos.</p>
            <p className="text-midnight-500 text-sm">Intenta de nuevo más tarde.</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-midnight-400 text-lg">No se encontraron productos con los filtros seleccionados.</p>
            <Link
              href="/catalogo"
              className="inline-block mt-4 text-gold-400 hover:text-gold-300 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                index={i}
                product={{
                  ...product,
                  type: product.type as "ARABE" | "DISENADOR",
                  variants: product.variants.map((v) => ({
                    ...v,
                    price: Number(v.price),
                  })),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
