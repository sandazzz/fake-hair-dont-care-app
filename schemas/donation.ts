import { z } from "zod";

export const hairTypesEnum = z.enum([
  "Naturels (non colorés/non décolorés)",
  "Coloration Végétale",
  "Tie and Dye (ombré)",
  "Colorés",
  "Décolorés",
  "Méchés",
  "Henné (coloré/neutre)",
]);

export const DonationSchema = z.object({
  civility: z.enum(["monsieur", "madame"]).nullable(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().nullable(),
  hairTypes: hairTypesEnum.optional(),
  email: z.string().email(),
  allowResale: z.boolean().default(false),
  allowWigUse: z.boolean().default(false),
  wantsConfirmation: z.boolean().default(false),
  message: z.string().optional(),
});

export type DonationInput = z.input<typeof DonationSchema>;
export type DonationOutput = z.output<typeof DonationSchema>;
