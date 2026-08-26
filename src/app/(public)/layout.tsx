import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </CartProvider>
  );
}
