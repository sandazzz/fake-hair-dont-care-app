"use server";

import { z } from "zod";
import { action } from "@/lib/safe-action";
import { transporter } from "@/lib/transporter";
import { getSession } from "@/lib/auth-session";

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

export const sendEmail = action
  .schema(sendEmailSchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await getSession();

      if (!session?.user) {
        return { success: false, error: "Non autorisé" };
      }

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: parsedInput.to,
        subject: parsedInput.subject,
        text: parsedInput.body,
      });

      return { success: true };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return {
        success: false,
        error: "Une erreur est survenue lors de l'envoi de l'email",
      };
    }
  });
