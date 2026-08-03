"use client"

import { useState, useEffect } from "react"
import { Button, Input, Badge } from "@/components/ui"
import { Card, CardBody } from "@/components/ui/Card"
import { formatPrice } from "@/lib/utils"

interface Variant {
  id?: string
  type: "BOTTLE" | "DECANT"
  price: number
  ml: number
  stock: number
  sku?: string
}

interface Product {
  id: string
  name: string
  slug: string
  description: string
  type: "ARABE" | "DISENADOR"
  brand: string | null
  notes: string | null
  categoryId: string | null
  category: { id: string; name: string } | null
  images: string[]
  featured: boolean
  variants: Variant[]
  createdAt: string
}

interface Category {
  id: string
  name: string
  _count?: { products: number }
}

const defaultForm = {
  name: "",
  description: "",
  type: "ARABE" as "ARABE" | "DISENADOR",
  brand: "",
  notes: "",
  categoryId: "",
  featured: false,
  images: "",
  variants: [] as { type: "BOTTLE" | "DECANT"; price: number; ml: number; stock: number }[],
}

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch("/api/productos")
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (e) {
      console.error("Error fetching products", e)
    } finally {
      setLoading(false)
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categorias")
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (e) {
      console.error("Error fetching categories", e)
    }
  }

  function openCreateModal() {
    setEditingProduct(null)
    setForm(defaultForm)
    setError("")
    setModalOpen(true)
  }

  function openEditModal(product: Product) {
    setEditingProduct(product)
    setForm({
      name: product.name,
      description: product.description,
      type: product.type,
      brand: product.brand || "",
      notes: product.notes || "",
      categoryId: product.categoryId || "",
      featured: product.featured,
      images: product.images.join(", "),
      variants: product.variants.map((v) => ({
        type: v.type,
        price: v.price,
        ml: v.ml,
        stock: v.stock,
      })),
    })
    setError("")
    setModalOpen(true)
  }

  function addVariant() {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { type: "BOTTLE" as const, price: 0, ml: 0, stock: 0 }],
    }))
  }

  function removeVariant(index: number) {
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  function updateVariant(index: number, field: string, value: string | number) {
    setForm((prev) => {
      const variants = [...prev.variants]
      variants[index] = { ...variants[index], [field]: value }
      return { ...prev, variants }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      const body = {
        name: form.name,
        description: form.description,
        type: form.type,
        brand: form.brand || undefined,
        notes: form.notes || undefined,
        categoryId: form.categoryId || undefined,
        featured: form.featured,
        images: form.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        variants: form.variants.filter((v) => v.ml > 0 && v.price > 0),
      }

      let res: Response

      if (editingProduct) {
        res = await fetch(`/api/productos/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch("/api/productos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al guardar")
      }

      setModalOpen(false)
      fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/productos/${id}`, { method: "DELETE" })
      if (res.ok) {
        setDeleteConfirm(null)
        fetchProducts()
      }
    } catch (e) {
      console.error("Error deleting product", e)
    }
  }

  const typeLabel = (t: "ARABE" | "DISENADOR") => (t === "ARABE" ? "Árabe" : "Diseñador")

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gold-500/30 border-t-gold-400 rounded-full" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif text-midnight-100">Productos</h1>
        <Button onClick={openCreateModal}>Agregar Producto</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-800/50">
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Imagen</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Nombre</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Tipo</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Precios</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Variantes</th>
                  <th className="text-right text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight-800/30">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-midnight-400">
                      No hay productos registrados
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-midnight-800/20 transition-colors">
                      <td className="px-4 py-3">
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-midnight-800"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-midnight-800 flex items-center justify-center">
                            <span className="text-midnight-500 text-xs">—</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-midnight-100">{product.name}</p>
                        {product.brand && (
                          <p className="text-xs text-midnight-400 mt-0.5">{product.brand}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={product.type === "ARABE" ? "arabe" : "disenador"}>
                          {typeLabel(product.type)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-midnight-200">
                          {product.variants.length > 0
                            ? `${formatPrice(Math.min(...product.variants.map((v) => v.price)))}`
                            : "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {product.variants.map((v) => (
                            <Badge key={v.id || `${v.type}-${v.ml}`} variant={v.type === "BOTTLE" ? "bottle" : "decant"}>
                              {v.type === "BOTTLE" ? "Bottle" : "Decant"} {v.ml}ml
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditModal(product)}>
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(product.id)}>
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative bg-midnight-900 border border-midnight-800/50 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-midnight-900 border-b border-midnight-800/50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-serif text-midnight-100">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-midnight-400 hover:text-midnight-100 hover:bg-midnight-800/50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="product-name"
                  label="Nombre"
                  placeholder="Nombre del producto"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />

                <div className="w-full">
                  <label className="block text-sm font-medium text-midnight-200 mb-1.5">Tipo</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value as "ARABE" | "DISENADOR" }))}
                    className="w-full px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50 transition-all duration-200 appearance-none"
                  >
                    <option value="ARABE">Árabe</option>
                    <option value="DISENADOR">Diseñador</option>
                  </select>
                </div>

                <Input
                  id="product-brand"
                  label="Marca"
                  placeholder="Marca del perfume"
                  value={form.brand}
                  onChange={(e) => setForm((prev) => ({ ...prev, brand: e.target.value }))}
                />

                <div className="w-full">
                  <label className="block text-sm font-medium text-midnight-200 mb-1.5">Categoría</label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50 transition-all duration-200 appearance-none"
                  >
                    <option value="">Sin categoría</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-midnight-200 mb-1.5">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                  className="w-full px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50 transition-all duration-200 resize-none"
                  placeholder="Descripción del producto"
                />
              </div>

              <Input
                id="product-notes"
                label="Notas"
                placeholder="Notas olfativas"
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              />

              <Input
                id="product-images"
                label="Imágenes (URLs separadas por coma)"
                placeholder="https://..."
                value={form.images}
                onChange={(e) => setForm((prev) => ({ ...prev, images: e.target.value }))}
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="product-featured"
                  checked={form.featured}
                  onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded border-midnight-600 bg-midnight-800 text-gold-500 focus:ring-gold-400/40 focus:ring-offset-midnight-900"
                />
                <label htmlFor="product-featured" className="text-sm text-midnight-200">
                  Producto destacado
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-midnight-200">Variantes</label>
                  <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                    Agregar variante
                  </Button>
                </div>
                <div className="space-y-3">
                  {form.variants.length === 0 && (
                    <p className="text-sm text-midnight-400">No hay variantes. Agrega al menos una.</p>
                  )}
                  {form.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="bg-midnight-800/40 border border-midnight-700/50 rounded-lg p-4 grid grid-cols-2 md:grid-cols-5 gap-3"
                    >
                      <div className="w-full">
                        <label className="block text-xs text-midnight-400 mb-1">Tipo</label>
                        <select
                          value={variant.type}
                          onChange={(e) => updateVariant(index, "type", e.target.value)}
                          className="w-full px-3 py-2 bg-midnight-800 border border-midnight-600 rounded-lg text-sm text-midnight-100 focus:outline-none focus:ring-2 focus:ring-gold-400/40 appearance-none"
                        >
                          <option value="BOTTLE">Bottle</option>
                          <option value="DECANT">Decant</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-midnight-400 mb-1">Precio</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={variant.price || ""}
                          onChange={(e) => updateVariant(index, "price", parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-midnight-800 border border-midnight-600 rounded-lg text-sm text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-midnight-400 mb-1">ML</label>
                        <input
                          type="number"
                          min="0"
                          value={variant.ml || ""}
                          onChange={(e) => updateVariant(index, "ml", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-midnight-800 border border-midnight-600 rounded-lg text-sm text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-midnight-400 mb-1">Stock</label>
                        <input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) => updateVariant(index, "stock", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-midnight-800 border border-midnight-600 rounded-lg text-sm text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-midnight-800/50">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" loading={saving}>
                  {editingProduct ? "Guardar cambios" : "Crear producto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-midnight-900 border border-midnight-800/50 rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-serif text-midnight-100 mb-2">Confirmar eliminación</h3>
            <p className="text-sm text-midnight-300 mb-6">
              ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
