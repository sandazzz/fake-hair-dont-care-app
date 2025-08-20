"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { transporter } from "@/lib/transporter";
import { getSession } from "@/lib/auth-session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(["admin", "user"]),
});

export const createUser = action
  .schema(createUserSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("Non autorisé");
    }

    await auth.api.createUser({
      body: {
        email: parsedInput.email,
        password: parsedInput.password,
        name: parsedInput.name,
        role: parsedInput.role,
      },
      headers: await headers(),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: parsedInput.email,
      subject: "Création de compte",
      text: `Votre compte a été créé avec succès. Vous pouvez désormais vous connecter avec les identifiants suivants : ${parsedInput.email} et ${parsedInput.password}`,
    });

    revalidatePath("/dashboard/users");
  });
