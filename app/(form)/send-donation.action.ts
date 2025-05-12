"use server";

import { action } from "@/lib/safe-action";
import { DonationSchema } from "@/schemas/donation";
import { prisma } from "@/lib/prisma";
import { generateSpecialId } from "@/lib/random";
import nodemailer from "nodemailer";

type EmailData = {
  to: string;
  name: string;
};

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
      const sexe = civility ?? "";
      const specialId = generateSpecialId();
      await prisma.donation.create({
        data: {
          civility: sexe,
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
      console.log(specialId);
      sendThankYouEmail({
        to: "sandarisoarakotovelo@gmail.com",
        name: "Sanda",
      });
      return { success: true };
    }
  );

async function sendThankYouEmail({
  to,
  name,
}: EmailData): Promise<{ success: boolean; error?: string }> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // <<< ignore les certificats auto-signés
    },
  });

  const mailOptions = {
    from: `"MaDons" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Merci pour votre don 🙏",
    text: `Bonjour ${name},

Merci infiniment pour votre don.

Nous apprécions grandement votre générosité. Ce geste contribue réellement à notre mission.

Bien cordialement,
L'équipe MaDons`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Erreur envoi mail :", error);
    return { success: false, error: error.message };
  }
}
