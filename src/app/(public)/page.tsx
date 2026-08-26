import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/features/HeroSection";
import { CategorySection } from "@/components/features/CategorySection";
import { DecantSection } from "@/components/features/DecantSection";
import { StorySection } from "@/components/features/StorySection";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { ProductCard } from "@/components/features/ProductCard";
import { CTASection } from "@/components/features/CTASection";
import { FragranceFinder } from "@/components/features/FragranceFinder";

async function getProducts(opts?: { featured?: boolean }) {
  try {
    const products = await prisma.product.findMany({
      where: opts?.featured ? { featured: true } : undefined,
      include: { category: true, variants: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
    return products.map((p) => ({
      ...p,
      type: p.type as "ARABE" | "DISENADOR",
      variants: p.variants.map((v) => ({ ...v, price: Number(v.price) })),
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featured, newProducts] = await Promise.all([
    getProducts({ featured: true }),
    getProducts(),
  ]);

  return (
    <>
      <HeroSection />

      <CategorySection />

      <FragranceFinder />

      <DecantSection />

      <StorySection />

      {featured.length > 0 && (
        <section className="py-28 relative bg-base">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,168,67,0.04)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium inline-block mb-3">
                Selección de Nicho
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-4 leading-[1.1] tracking-tight">
                Los Más <span className="gold-text-bright">Vendidos</span>
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
              <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
                Las fragancias que cautivan y definen la elegancia de nuestros clientes más exigentes.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <TestimonialsSection />

      {newProducts.length > 0 && (
        <section className="py-28 relative bg-surface border-t border-gold-500/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-medium inline-block mb-3">
                Novedades Exclusivas
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-4 leading-[1.1] tracking-tight">
                Últimas <span className="gold-text-bright">Llegadas</span>
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-4" />
              <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
                Descubre los últimos lanzamientos de perfumería oriental y de alta costura internacional.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {newProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
