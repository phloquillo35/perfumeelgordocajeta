import { PrismaClient, ProductType, VariantType } from "@prisma/client";
import { upsertAdminFromEnv } from "./admin";

const prisma = new PrismaClient();

async function main() {
  await upsertAdminFromEnv(prisma);

  const [arabeCat, disenadorCat] = await Promise.all([
    prisma.category.upsert({
      where: { slug: "arabes" },
      update: {},
      create: {
        name: "Árabes",
        slug: "arabes",
        description: "Perfumes árabes tradicionales y modernos",
      },
    }),
    prisma.category.upsert({
      where: { slug: "disenador" },
      update: {},
      create: {
        name: "Diseñador",
        slug: "disenador",
        description: "Perfumes de las casas de diseño más prestigiosas",
      },
    }),
  ]);

  const products = [
    {
      name: "Oud Otoño",
      slug: "oud-otono",
      description:
        "Una fragancia oriental cautivadora que combina notas de oud, azafrán y ámbar. Perfecta para ocasiones especiales y noches de invierno. Larga duración con un aura sofisticada que perdura todo el día.",
      type: "ARABE" as ProductType,
      brand: "Arabian Oud",
      notes: "Salida: Azafrán, Bergamota | Corazón: Oud, Rosa | Fondo: Ámbar, Almizcle, Sándalo",
      categoryId: arabeCat.id,
      images: ["/images/arabe.webp"],
      featured: true,
      variants: [
        { type: "BOTTLE" as VariantType, price: 1890, ml: 50, stock: 15, sku: "OUD-OTO-B50" },
        { type: "DECANT" as VariantType, price: 390, ml: 10, stock: 30, sku: "OUD-OTO-D10" },
      ],
    },
    {
      name: "Rosa Nocturna",
      slug: "rosa-nocturna",
      description:
        "Una elegante mezcla de rosa damascena, pachulí y vainilla. Una fragancia floral amaderada con un toque dulce que la hace inolvidable. Ideal para uso diario y ocasiones formales.",
      type: "ARABE" as ProductType,
      brand: "Swiss Arabian",
      notes: "Salida: Bergamota, Azafrán | Corazón: Rosa Damascena, Jazmín | Fondo: Pachulí, Vainilla, Almizcle",
      categoryId: arabeCat.id,
      images: ["/images/arabe.webp"],
      featured: true,
      variants: [
        { type: "BOTTLE" as VariantType, price: 1650, ml: 50, stock: 20, sku: "ROSA-NOC-B50" },
        { type: "DECANT" as VariantType, price: 350, ml: 10, stock: 25, sku: "ROSA-NOC-D10" },
      ],
    },
    {
      name: "Ámbar Real",
      slug: "ambar-real",
      description:
        "Una fragancia regia que combina ámbar gris, incienso y cuero. Poderosa y magnética, esta fragancia está diseñada para quien busca dejar una huella inolvidable.",
      type: "ARABE" as ProductType,
      brand: "Al Haramain",
      notes: "Salida: Incienso, Azafrán | Corazón: Ámbar, Cuero | Fondo: Oud, Almizcle, Sándalo",
      categoryId: arabeCat.id,
      images: ["/images/arabe.webp"],
      featured: true,
      variants: [
        { type: "BOTTLE" as VariantType, price: 2100, ml: 50, stock: 10, sku: "AMB-REAL-B50" },
        { type: "DECANT" as VariantType, price: 450, ml: 10, stock: 20, sku: "AMB-REAL-D10" },
      ],
    },
    {
      name: "Sauvage Elixir",
      slug: "sauvage-elixir",
      description:
        "La interpretación más intensa de Sauvage. Una concentración extrema de notas especiadas y amaderadas. Una firma olfativa única e irrepetible.",
      type: "DISENADOR" as ProductType,
      brand: "Dior",
      notes: "Salida: Canela, Nuez Moscada | Corazón: Lavanda, Regaliz | Fondo: Sándalo, Cedro, Vainilla",
      categoryId: disenadorCat.id,
      images: ["/images/disenador.webp"],
      featured: true,
      variants: [
        { type: "BOTTLE" as VariantType, price: 3200, ml: 60, stock: 8, sku: "SAUV-ELIX-B60" },
        { type: "DECANT" as VariantType, price: 550, ml: 10, stock: 15, sku: "SAUV-ELIX-D10" },
      ],
    },
    {
      name: "Bleu de Chanel",
      slug: "bleu-de-chanel",
      description:
        "Una fragancia icónica que encarna la libertad y la elegancia. Una mezcla perfecta de cítricos, jengibre y maderas nobles. Versátil y sofisticada.",
      type: "DISENADOR" as ProductType,
      brand: "Chanel",
      notes: "Salida: Pomelo, Limón, Menta | Corazón: Jengibre, Nuez Moscada | Fondo: Cedro, Sándalo, Incienso",
      categoryId: disenadorCat.id,
      images: ["/images/disenador.webp"],
      featured: false,
      variants: [
        { type: "BOTTLE" as VariantType, price: 2800, ml: 50, stock: 12, sku: "BLEU-CHAN-B50" },
        { type: "DECANT" as VariantType, price: 480, ml: 10, stock: 20, sku: "BLEU-CHAN-D10" },
      ],
    },
    {
      name: "Aventus Creed",
      slug: "aventus-creed",
      description:
        "La leyenda moderna de las fragancias. Una explosión de piña, bergamota y grosella negra con un fondo amaderado y almizclado. Para el hombre que celebra la vida.",
      type: "DISENADOR" as ProductType,
      brand: "Creed",
      notes: "Salida: Piña, Bergamota, Grosella Negra | Corazón: Abedul, Rosa, Jazmín | Fondo: Almizcle, Vainilla, Sándalo",
      categoryId: disenadorCat.id,
      images: ["/images/disenador.webp"],
      featured: true,
      variants: [
        { type: "BOTTLE" as VariantType, price: 4500, ml: 50, stock: 5, sku: "AVENT-CRE-B50" },
        { type: "DECANT" as VariantType, price: 750, ml: 10, stock: 10, sku: "AVENT-CRE-D10" },
      ],
    },
  ];

  for (const product of products) {
    const { variants, ...productData } = product;

    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        variants: {
          create: variants,
        },
      },
    });
  }

  console.log("✅ Base de datos poblada exitosamente");
  console.log("  - 1 admin user (admin@perfumes.com / admin123)");
  console.log("  - 2 categorías");
  console.log(`  - ${products.length} productos con variantes`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
