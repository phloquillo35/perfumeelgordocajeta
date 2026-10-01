import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { requireAdmin } from "@/lib/api-auth"

const createCategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  image: z.string().optional(),
})

const updateCategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  image: z.string().optional(),
})

const deleteCategorySchema = z.object({
  id: z.string(),
})

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(categories)
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = createCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, description, image } = parsed.data
    const slug = slugify(name)

    const existing = await prisma.category.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una categoría con ese nombre" },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: { name, slug, description, image },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al crear categoría" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = updateCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { id, name, description, image } = parsed.data
    const slug = slugify(name)

    const duplicate = await prisma.category.findFirst({
      where: { slug, NOT: { id } },
    })
    if (duplicate) {
      return NextResponse.json(
        { error: "Ya existe otra categoría con ese nombre" },
        { status: 409 }
      )
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name, slug, description, image },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(category)
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al actualizar categoría" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied

  try {
    const body = await request.json()
    const parsed = deleteCategorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "ID requerido" },
        { status: 400 }
      )
    }

    await prisma.category.delete({ where: { id: parsed.data.id } })

    return NextResponse.json({ success: true })
  } catch (e) {
      console.error("[API Error]", e)
    return NextResponse.json(
      { error: "Error al eliminar categoría" },
      { status: 500 }
    )
  }
}
