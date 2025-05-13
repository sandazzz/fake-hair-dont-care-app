"use server";

import { action } from "@/lib/safe-action";
import { DonationSchema } from "@/schemas/donation";
import { prisma } from "@/lib/prisma";
import { generateSpecialId } from "@/lib/random";
import { sendThankYouEmail } from "./send-confirmation-mail";

export const sendDonation = action
  .schema(DonationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const specialId = generateSpecialId();

      const mail = await sendThankYouEmail({
        lastName: parsedInput.lastName,
        firstName: parsedInput.firstName,
        age: parsedInput.age,
        hairType: parsedInput.hairTypes,
        email: parsedInput.email,
        allowResale: parsedInput.allowResale,
        allowWigUse: parsedInput.allowWigUse,
        message: parsedInput.message,
        specialId,
      });

      if (!mail.success) {
        return { success: false, error: mail.error };
      }

      await prisma.donation.create({
        data: {
          ...parsedInput,
          civility: parsedInput.civility ?? "",
          specialId,
          status: "pending",
        },
      });

      return { success: true };
    } catch (err: any) {
      console.error("Erreur dans sendDonation:", err);
      return { success: false, error: "Une erreur interne est survenue." };
    }
  });
