import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify, generateSku } from "@/lib/utils";
import { requireAdmin } from "@/lib/api-auth"

const variantSchema = z.object({
  type: z.enum(["BOTTLE", "DECANT"]),
  price: z.number().positive(),
  ml: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
});

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["ARABE", "DISENADOR"]),
  brand: z.string().optional(),
  notes: z.string().optional(),
  categoryId: z.string().optional(),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  variants: z.array(variantSchema).min(1),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const normalized = products.map((product) => ({
      ...product,
      type: product.type as "ARABE" | "DISENADOR",
      variants: product.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    }));

    return NextResponse.json(normalized);
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { variants, ...productData } = parsed.data;
    const slug = slugify(productData.name);

    const product = await prisma.product.create({
      data: {
        ...productData,
        slug,
        variants: {
          create: variants.map((v) => ({
            type: v.type,
            price: v.price,
            ml: v.ml,
            stock: v.stock,
            sku: generateSku(productData.name, v.type, v.ml),
          })),
        },
      },
      include: {
        category: true,
        variants: true,
      },
    });

    return NextResponse.json({
      ...product,
      type: product.type as "ARABE" | "DISENADOR",
      variants: product.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    }, { status: 201 });
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}
