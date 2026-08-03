"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession, SessionProvider } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useState } from "react"

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const links = [
    { href: "/admin/productos", label: "Productos" },
    { href: "/admin/categorias", label: "Categorías" },
    { href: "/admin/pedidos", label: "Pedidos" },
  ]

  return (
    <div className="min-h-screen bg-midnight-950 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-midnight-900 border-r border-midnight-800/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-midnight-800/50">
          <Link href="/admin" className="text-xl font-serif text-gold-400 tracking-wide">
            Perfumes
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gold-500/10 text-gold-400 border border-gold-500/20 shadow-sm shadow-gold-500/5"
                    : "text-midnight-300 hover:text-midnight-100 hover:bg-midnight-800/50"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-midnight-800/50">
          <div className="space-y-2">
            {session?.user?.name && (
              <p className="px-4 text-xs text-midnight-400 truncate">{session.user.name}</p>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-midnight-300 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-midnight-950/80 backdrop-blur-md border-b border-midnight-800/50">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-midnight-300 hover:text-midnight-100 hover:bg-midnight-800/50 transition-colors"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayout>{children}</AdminLayout>
    </SessionProvider>
  )
}
