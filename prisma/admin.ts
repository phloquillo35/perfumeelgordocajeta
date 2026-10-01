import bcrypt from "bcryptjs";
import type { PrismaClient } from "@prisma/client";

// Cuenta que el seed original creaba con credenciales públicas (admin@perfumes.com / admin123).
// Se elimina al configurar un admin propio.
const LEGACY_ADMIN_EMAIL = "admin@perfumes.com";

/**
 * Crea o actualiza el admin usando ADMIN_EMAIL y ADMIN_PASSWORD del entorno.
 * No hay credenciales por defecto: si faltan o son débiles, falla.
 */
export async function upsertAdminFromEnv(prisma: PrismaClient) {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Definí ADMIN_EMAIL y ADMIN_PASSWORD antes de ejecutar (no hay credenciales por defecto).");
  }
  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD debe tener al menos 12 caracteres.");
  }

  const hash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { password: hash },
    create: { name: "Admin", email, password: hash },
  });

  if (email !== LEGACY_ADMIN_EMAIL) {
    const removed = await prisma.adminUser.deleteMany({ where: { email: LEGACY_ADMIN_EMAIL } });
    if (removed.count > 0) console.log(`Se eliminó la cuenta heredada ${LEGACY_ADMIN_EMAIL}.`);
  }

  console.log(`Admin listo: ${email}`);
}
