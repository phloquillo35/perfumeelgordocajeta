"use client"

import { useState, useEffect } from "react"
import { Button, Input } from "@/components/ui"
import { Card, CardBody } from "@/components/ui/Card"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  _count?: { products: number }
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categorias")
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (e) {
      console.error("Error fetching categories", e)
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    setEditing(null)
    setName("")
    setDescription("")
    setImage("")
    setError("")
    setModalOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setName(cat.name)
    setDescription(cat.description || "")
    setImage(cat.image || "")
    setError("")
    setModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSaving(true)

    try {
      const body: Record<string, string | undefined> = { name }
      if (description) body.description = description
      if (image) body.image = image

      let res: Response
      if (editing) {
        res = await fetch(`/api/categorias`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing.id, ...body }),
        })
      } else {
        res = await fetch("/api/categorias", {
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
      fetchCategories()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch("/api/categorias", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setDeleteConfirm(null)
        fetchCategories()
      }
    } catch (e) {
      console.error("Error deleting category", e)
    }
  }

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
        <h1 className="text-2xl font-serif text-midnight-100">Categorías</h1>
        <Button onClick={openCreate}>Agregar Categoría</Button>
      </div>

      <Card>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-midnight-800/50">
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Nombre</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Slug</th>
                  <th className="text-left text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Descripción</th>
                  <th className="text-center text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Productos</th>
                  <th className="text-right text-xs font-medium text-midnight-400 uppercase tracking-wider px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-midnight-800/30">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-midnight-400">
                      No hay categorías registradas
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-midnight-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-midnight-100">{cat.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-midnight-400">{cat.slug}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-midnight-300 line-clamp-1">
                          {cat.description || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm text-midnight-200">{cat._count?.products ?? 0}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}>
                            Editar
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(cat.id)}>
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
          <div className="relative bg-midnight-900 border border-midnight-800/50 rounded-xl w-full max-w-lg shadow-2xl">
            <div className="border-b border-midnight-800/50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-serif text-midnight-100">
                {editing ? "Editar Categoría" : "Nueva Categoría"}
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

              <Input
                id="category-name"
                label="Nombre"
                placeholder="Nombre de la categoría"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-midnight-200 mb-1.5">Descripción</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-midnight-800/80 border border-midnight-600 rounded-lg text-midnight-100 placeholder:text-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-500/50 transition-all duration-200 resize-none"
                  placeholder="Descripción opcional"
                />
              </div>

              <Input
                id="category-image"
                label="Imagen (URL)"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <div className="flex justify-end gap-3 pt-2 border-t border-midnight-800/50">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" loading={saving}>
                  {editing ? "Guardar cambios" : "Crear categoría"}
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
              ¿Estás seguro de que deseas eliminar esta categoría? Los productos asociados perderán la categoría.
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
