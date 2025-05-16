import { env } from "@/lib/env";
import { transporter } from "@/lib/transporter";

type EmailData = {
  lastName: string;
  firstName: string;
  age?: number;
  hairType: string;
  email: string;
  allowResale: boolean;
  allowWigUse: boolean;
  message?: string;
  specialId: string;
};

export async function sendThankYouEmail(
  data: EmailData
): Promise<{ success: boolean; error?: string }> {
  const {
    lastName,
    firstName,
    age,
    hairType,
    email,
    allowResale,
    allowWigUse,
    message,
    specialId,
  } = data;

  const text = `Bonjour ${firstName} ${lastName},

Nous vous remercions sincèrement pour votre promesse de don !

Voici le récapitulatif de votre don :
──────────────────────────────────────
• Numéro de don : ${specialId}
• Âge : ${age} ans
• Type de cheveux : ${hairType}
• Autorisation de revente : ${allowResale ? "Oui" : "Non"}
• Autorisation pour perruques : ${allowWigUse ? "Oui" : "Non"}
• Message : ${message || "Aucun"}
──────────────────────────────────────

Nous apprécions profondément votre geste. Votre don contribue à redonner espoir et confiance aux personnes qui en ont besoin.

Bien cordialement,
L'équipe Fake Hair Don't Care`;

  const mailOptions = {
    from: `"Fake Hair Don't Care" <${env.EMAIL_USER}>`,
    to: email,
    subject: "Merci pour votre don – Récapitulatif de votre promesse",
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    console.error("Erreur envoi mail :", error);
    return { success: false, error: error.message };
  }
}
