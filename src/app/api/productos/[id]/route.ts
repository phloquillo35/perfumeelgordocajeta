import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify, generateSku } from "@/lib/utils"
import { z } from "zod"
import { requireAdmin } from "@/lib/api-auth"

const variantSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["BOTTLE", "DECANT"]),
  price: z.number().positive(),
  ml: z.number().int().positive(),
  stock: z.number().int().min(0).default(0),
})

const updateProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["ARABE", "DISENADOR"]),
  brand: z.string().optional(),
  notes: z.string().optional(),
  categoryId: z.string().optional(),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  variants: z.array(variantSchema).min(1),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...product,
      type: product.type as "ARABE" | "DISENADOR",
      variants: product.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    })
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al obtener producto" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateProductSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { variants, ...productData } = parsed.data
    const slug = slugify(productData.name)

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    const variantIds = variants.filter((v) => v.id).map((v) => v.id as string)

    await prisma.productVariant.deleteMany({
      where: { productId: id, NOT: { id: { in: variantIds } } },
    })

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        slug,
        variants: {
          upsert: variants.map((v) => ({
            where: v.id
              ? { id: v.id }
              : { productId_type_ml: { productId: id, type: v.type, ml: v.ml } },
            create: {
              type: v.type,
              price: v.price,
              ml: v.ml,
              stock: v.stock,
              sku: generateSku(productData.name, v.type, v.ml),
            },
            update: {
              type: v.type,
              price: v.price,
              ml: v.ml,
              stock: v.stock,
            },
          })),
        },
      },
      include: {
        category: true,
        variants: true,
      },
    })

    return NextResponse.json({
      ...product,
      type: product.type as "ARABE" | "DISENADOR",
      variants: product.variants.map((v) => ({
        ...v,
        price: Number(v.price),
      })),
    })
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const { id } = await params

    const existing = await prisma.product.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al eliminar producto" },
      { status: 500 }
    )
  }
}
