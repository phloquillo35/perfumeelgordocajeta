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
    default: "Sebi Fragrance Decants | Decants de Perfumes en Tafi Viejo, Tucumán",
    template: "%s | Sebi Fragrance Decants",
  },
  description:
    "Decants de perfumes originales en Tafi Viejo, Tucumán. Colección curada de fragancias árabes y de diseñador en presentaciones bottle y decant, con envíos a todo el país.",
  keywords: [
    "decants", "perfumes árabes", "perfumes de diseñador", "fragancias de lujo",
    "Tafi Viejo", "Tucumán", "decants de perfumes",
  ],
  openGraph: {
    title: "Sebi Fragrance Decants | Decants de Perfumes en Tafi Viejo, Tucumán",
    description: "Decants de perfumes originales en Tafi Viejo, Tucumán. Fragancias árabes y de diseñador con envíos a todo el país.",
    type: "website",
    locale: "es_AR",
  },
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
