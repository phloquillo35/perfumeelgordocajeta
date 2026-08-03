import type { Metadata } from "next";
import { Montserrat, Cormorant } from "next/font/google";
import "@/styles/globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Perfumes Exclusivos | Fragancias Árabes y de Diseñador",
    template: "%s | Perfumes Exclusivos",
  },
  description:
    "Descubre la más exclusiva colección de perfumes árabes y de diseñador. Fragancias de lujo en presentaciones bottle y decant.",
  keywords: [
    "perfumes árabes", "perfumes de diseñador", "fragancias de lujo",
    "decants", "perfumes exclusivos",
  ],
  openGraph: {
    title: "Perfumes Exclusivos | Fragancias Árabes y de Diseñador",
    description: "Descubre la más exclusiva colección de perfumes árabes y de diseñador.",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
