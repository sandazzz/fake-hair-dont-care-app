import { z } from "zod";

export const hairTypesEnum = z.enum(
  [
    "Naturels (non colorés/non décolorés)",
    "Coloration Végétale",
    "Tie and Dye (ombré)",
    "Colorés",
    "Décolorés",
    "Méchés",
    "Henné (coloré/neutre)",
  ],
  {
    required_error: "Le type de cheveux est requis",
  }
);

export const DonationSchema = z.object({
  civility: z.enum(["monsieur", "madame"]),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  age: z.number().optional(),
  hairTypes: hairTypesEnum,
  email: z.string().email("L'adresse email n'est pas valide"),
  allowResale: z.boolean().default(false),
  allowWigUse: z.boolean().default(false),
  message: z.string().optional(),
});

export type DonationInput = z.input<typeof DonationSchema>;
export type DonationOutput = z.output<typeof DonationSchema>;
