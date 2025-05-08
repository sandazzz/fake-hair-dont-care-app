"use server";

import { action } from "@/lib/safe-action";
import { DonationSchema } from "@/schemas/donation";
import { prisma } from "@/lib/prisma";

export const sendDonation = action
  .schema(DonationSchema)
  .action(
    async ({
      parsedInput: {
        civility,
        firstName,
        lastName,
        age,
        hairTypes,
        email,
        allowResale,
        allowWigUse,
        wantsConfirmation,
        message,
      },
    }) => {
      const specialId = "test-112-2025";
      await prisma.donation.create({
        data: {
          civility: civility,
          firstName: firstName,
          lastName: lastName,
          age: age,
          hairTypes: hairTypes,
          email: email,
          allowResale: allowResale,
          allowWigUse: allowWigUse,
          wantsConfirmation: wantsConfirmation,
          message: message,
          specialId: specialId,
          status: "pending",
        },
      });

      return { success: true };
    }
  );
