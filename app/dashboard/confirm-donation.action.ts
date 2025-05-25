"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";

const confirmDonationSchema = z.object({
  id: z.string(),
});

export const confirmDonation = action
  .schema(confirmDonationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await getSession();

      if (!session?.user) {
        return { success: false, error: "Non autorisé" };
      }

      const donation = await prisma.donation.findUnique({
        where: { id: parsedInput.id },
      });

      if (!donation) {
        return { success: false, error: "Don non trouvé" };
      }

      if (donation.status === "confirmed") {
        return { success: false, error: "Le don est déjà confirmé" };
      }

      await prisma.donation.update({
        where: { id: parsedInput.id },
        data: { status: "confirmed" },
      });

      revalidatePath(`/dashboard/${parsedInput.id}`);
      revalidatePath("/dashboard");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: "Une erreur est survenue lors de la confirmation du don",
      };
    }
  });
