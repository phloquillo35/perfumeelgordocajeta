"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Input, Button } from "@/components/ui"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Credenciales inválidas")
      return
    }

    router.push("/admin/productos")
  }

  return (
    <div className="min-h-screen bg-midnight-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-gold-400 mb-2">Perfumes</h1>
          <p className="text-midnight-300 text-sm">Panel de administración</p>
        </div>

        <div className="bg-midnight-900/50 border border-midnight-800/50 rounded-xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 text-center">
                {error}
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="admin@perfumes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" loading={loading}>
              Iniciar sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
