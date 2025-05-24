// scripts/create-admin.ts
//npx tsx scripts/create-admin.ts

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

(async () => {
  try {
    // Création de l'utilisateur
    const { user } = await auth.api.signUpEmail({
      body: {
        email: "test@gmail.com",
        password: "qidLOvBzc7ww6BkoavHhots7FY2OBx30",
        name: "Admin",
      },
    });

    console.log("✅ Utilisateur créé :", user);

    // Mise à jour du rôle de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    });

    console.log("✅ Rôle mis à jour :", updatedUser);
  } catch (error) {
    console.error(
      "❌ Erreur lors de la création ou de la mise à jour de l'utilisateur :",
      error
    );
  } finally {
    await prisma.$disconnect();
  }
})();
