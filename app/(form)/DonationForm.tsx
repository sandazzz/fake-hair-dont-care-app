"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// 1. --- Schéma Zod ----------------------------------------------------------

const hairTypesEnum = z.enum([
  "Naturels (non colorés/non décolorés)",
  "Coloration Végétale",
  "Tie and Dye (ombré)",
  "Colorés",
  "Décolorés",
  "Méchés",
  "Henné (coloré/neutre)",
]);

const DonationSchema = z.object({
  civility: z.enum(["monsieur", "madame"]),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().int().optional(),
  hairTypes: hairTypesEnum,
  email: z.string().email(),
  allowResale: z.boolean().default(false),
  allowWigUse: z.boolean().default(false),
  wantsConfirmation: z.boolean().default(false),
  message: z.string().optional(),
});

type DonationInput = z.input<typeof DonationSchema>; // boolean | undefined
type DonationOutput = z.output<typeof DonationSchema>;
// 2. --- Composant React ------------------------------------------------------

export default function DonationForm() {
  const form = useForm<
    DonationInput, // ① valeurs manipulées par les champs
    undefined, // ② (pas de contexte)
    DonationOutput // ③ valeurs reçues par onSubmit
  >({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined,
      email: "",
      // ⚠️ pas de undefined: laisser le champ absent ou mettre null/"" si le composant le supporte
      allowResale: false,
      allowWigUse: false,
      wantsConfirmation: false,
    },
  });

  const onSubmit = (data: DonationOutput) => {
    console.table(data); // toutes les cases booléennes sont garanties présentes
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-xl"
      >
        {/* Civilité ---------------------------------------------------- */}
        <FormField
          control={form.control}
          name="civility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vous êtes : </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monsieur" id="civility-m" />
                    <label htmlFor="civility-m">Monsieur</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="madame" id="civility-f" />
                    <label htmlFor="civility-f">Madame</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Identité ---------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Jean" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Dupont" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Âge ---------------------------------------------------------- */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Âge</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value === undefined ? "" : field.value}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type de cheveux --------------------------------------------- */}
        <Controller
          control={form.control}
          name="hairTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de cheveux</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hairTypesEnum.options.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email -------------------------------------------------------- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jean.dupont@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Autorisations ----------------------------------------------- */}
        <div className="flex flex-col gap-2">
          {/* allowResale */}
          <FormField
            control={form.control}
            name="allowResale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="allowResale"
                    checked={field.value ?? false}
                    onCheckedChange={(v) =>
                      field.onChange(v === "indeterminate" ? false : v)
                    }
                  />
                </FormControl>
                <FormLabel htmlFor="allowResale" className="font-normal">
                  J’autorise la revente de la mèche
                </FormLabel>
              </FormItem>
            )}
          />

          {/* allowWigUse */}
          <FormField
            control={form.control}
            name="allowWigUse"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="allowWigUse"
                    checked={field.value ?? false}
                    onCheckedChange={(v) =>
                      field.onChange(v === "indeterminate" ? false : v)
                    }
                  />
                </FormControl>
                <FormLabel htmlFor="allowWigUse" className="font-normal">
                  J’autorise l’usage pour perruques
                </FormLabel>
              </FormItem>
            )}
          />

          {/* wantsConfirmation */}
          <FormField
            control={form.control}
            name="wantsConfirmation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="wantsConfirmation"
                    checked={field.value ?? false}
                    onCheckedChange={(v) =>
                      field.onChange(v === "indeterminate" ? false : v)
                    }
                  />
                </FormControl>
                <FormLabel htmlFor="wantsConfirmation" className="font-normal">
                  Je veux recevoir une confirmation
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Message ------------------------------------------------------ */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (facultatif)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Votre message…"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Toute information supplémentaire pour notre équipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Envoyer ma promesse de don
        </Button>
      </form>
    </Form>
  );
}
