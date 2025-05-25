"use server";

import { action } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getSession } from "@/lib/auth-session";

const searchSchema = z.object({
  query: z.string().trim(),
});

export const searchDonation = action
  .schema(searchSchema)
  .action(async ({ parsedInput }) => {
    const session = await getSession();

    if (!session?.user) {
      throw new Error("Non autorisé");
    }

    console.log(session.user.email);

    const donations = await prisma.donation.findMany({
      where: {
        OR: [
          {
            specialId: {
              contains: parsedInput.query,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: parsedInput.query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: parsedInput.query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    // Trier les résultats : d'abord les correspondances exactes de specialId, puis les autres
    return donations.sort((a, b) => {
      const aIsSpecialId = a.specialId
        .toLowerCase()
        .includes(parsedInput.query.toLowerCase());
      const bIsSpecialId = b.specialId
        .toLowerCase()
        .includes(parsedInput.query.toLowerCase());

      if (aIsSpecialId && !bIsSpecialId) return -1;
      if (!aIsSpecialId && bIsSpecialId) return 1;

      // Si les deux sont des correspondances de specialId ou aucun n'est une correspondance de specialId,
      // trier par date de création (plus récent en premier)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  });
