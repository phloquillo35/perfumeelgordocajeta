import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Guard para handlers de API que modifican datos.
 * El middleware solo protege las páginas de /admin, no /api, así que cada
 * handler de escritura debe llamar a esto primero.
 *
 * Uso:
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return null;
}
