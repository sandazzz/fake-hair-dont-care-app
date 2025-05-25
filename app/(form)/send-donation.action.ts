"use server";

import { action } from "@/lib/safe-action";
import { DonationSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { generateSpecialId } from "@/lib/random";
import { sendThankYouEmail } from "./send-confirmation-mail";
import { formatName } from "@/lib/format-name";

export const sendDonation = action
  .schema(DonationSchema)
  .action(async ({ parsedInput }) => {
    try {
      const specialId = generateSpecialId();

      const mail = await sendThankYouEmail({
        lastName: formatName(parsedInput.lastName),
        firstName: formatName(parsedInput.firstName),
        age: parsedInput.age,
        hairType: parsedInput.hairTypes,
        email: parsedInput.email,
        allowResale: parsedInput.allowResale,
        allowWigUse: parsedInput.allowWigUse,
        message: parsedInput.message,
        specialId,
      });
      // Conditon non fonctionnel !!!
      if (!mail.success) {
        return { success: false, error: mail.error };
      }

      const donation = await prisma.donation.create({
        data: {
          ...parsedInput,
          civility: parsedInput.civility ?? "",
          specialId,
          status: "pending",
        },
      });

      return { success: true, data: donation.specialId };
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erreur dans sendDonation:", err);
        return { success: false, error: err.message };
      } else {
        console.error("Erreur inconnue dans sendDonation:", err);
        return { success: false, error: "Une erreur interne est survenue." };
      }
    }
  });
