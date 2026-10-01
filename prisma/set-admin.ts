// Rota o crea el admin sin tocar productos ni categorías.
//   ADMIN_EMAIL=tu@mail.com ADMIN_PASSWORD='una-clave-larga' npm run admin:set
import { PrismaClient } from "@prisma/client";
import { upsertAdminFromEnv } from "./admin";

const prisma = new PrismaClient();

upsertAdminFromEnv(prisma)
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
