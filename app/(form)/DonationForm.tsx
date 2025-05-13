"use client";

import { useForm } from "react-hook-form";
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
import { toast } from "sonner";

import { sendDonation } from "./send-donation.action";
import {
  DonationInput,
  DonationOutput,
  DonationSchema,
} from "@/schemas/donation";

export default function DonationForm() {
  const form = useForm<DonationInput, undefined, DonationOutput>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      civility: null,
      firstName: "",
      lastName: "",
      age: undefined,
      hairTypes: undefined,
      email: "",
      allowResale: false,
      allowWigUse: false,
      message: "",
    },
  });

  const onSubmit = async (data: DonationOutput) => {
    console.table(data);

    // const result = await sendDonation(data);

    // if (result?.serverError) {
    //   toast.error("Erreur serveur", {
    //     description: "Une erreur est survenue lors de l'envoi du formulaire.",
    //   });
    //   return;
    // }

    // if (result?.validationErrors) {
    //   toast.error("Erreur de validation", {
    //     description: "Veuillez vérifier les champs du formulaire.",
    //   });
    //   return;
    // }

    // toast.success("Don enregistré", {
    //   description: "Merci pour votre contribution !",
    // });

    form.reset({
      civility: null,
      firstName: "",
      lastName: "",
      age: undefined,
      hairTypes: "",
      email: "",
      allowResale: false,
      allowWigUse: false,
      message: "",
    });
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
              <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                Vous êtes :{" "}
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
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
                <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                  Prénom
                </FormLabel>
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
                <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                  Nom
                </FormLabel>
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
              <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                Âge
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
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

        {/*Type de cheveux*/}
        <FormField
          control={form.control}
          name="hairTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                Type de cheveux
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir un type..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Naturels (non colorés/non décolorés)">
                    Naturels (non colorés/non décolorés)
                  </SelectItem>
                  <SelectItem value="Coloration Végétale">
                    Coloration Végétale
                  </SelectItem>
                  <SelectItem value="Tie and Dye (ombré)">
                    Tie and Dye (ombré)
                  </SelectItem>
                  <SelectItem value="Colorés">Colorés</SelectItem>
                  <SelectItem value="Décolorés">Décolorés</SelectItem>
                  <SelectItem value="Méchés">Méchés</SelectItem>
                  <SelectItem value="Henné (coloré/neutre)">
                    Henné (coloré/neutre)
                  </SelectItem>
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
              <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                Email
              </FormLabel>
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
        </div>

        {/* Message ------------------------------------------------------ */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-pink-700 font-medium text-sm">
                Message (facultatif)
              </FormLabel>
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

        <Button
          type="submit"
          className="w-full bg-pink-700 text-white hover:bg-pink-800 transition"
        >
          Envoyer ma promesse de don
        </Button>
      </form>
    </Form>
  );
}
