import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/features/HeroSection";
import { CategorySection } from "@/components/features/CategorySection";
import { DecantSection } from "@/components/features/DecantSection";
import { StorySection } from "@/components/features/StorySection";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { ProductCard } from "@/components/features/ProductCard";
import { CTASection } from "@/components/features/CTASection";

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

      <DecantSection />

      <StorySection />

      {featured.length > 0 && (
        <section className="py-32 relative bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
                Destacados
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 mb-4 leading-[1.1] tracking-tight">
                Los Más Vendidos
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6" />
              <p className="text-white/25 text-sm font-light tracking-wide max-w-xl mx-auto">
                Las fragancias que nuestros clientes más aman
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
        <section className="py-32 relative bg-[#080808]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <span className="text-white/25 text-[10px] uppercase tracking-[0.25em] font-light">
                Nuevos Ingresos
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mt-6 mb-4 leading-[1.1] tracking-tight">
                Últimas Llegadas
              </h2>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6" />
              <p className="text-white/25 text-sm font-light tracking-wide max-w-xl mx-auto">
                Lo más nuevo en nuestra colección
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
