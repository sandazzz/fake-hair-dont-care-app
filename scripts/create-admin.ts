// scripts/create-admin.ts
//npx tsx scripts/create-admin.ts
import { auth } from "@/lib/auth";

(async () => {
  const { user } = await auth.api.signUpEmail({
    body: {
      email: "test@gmail.com",
      password: "qidLOvBzc7ww6BkoavHhots7FY2OBx30",
      name: "Admin ",
    },
  });

  console.log("✅ Utilisateur créé :", user.id);
})();
