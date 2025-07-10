"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import { sendDonation } from "./send-donation.action";
import { DonationInput, DonationOutput, DonationSchema } from "@/lib/schemas";

import { useAction } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DonationForm() {
  const router = useRouter();
  const form = useForm<DonationInput, undefined, DonationOutput>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
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

  const { execute, isPending } = useAction(sendDonation, {
    onSuccess: (result) => {
      toast.success("Don enregistré", {
        description: (
          <span className="text-black">
            Merci pour votre contribution ! Vous allez avoir un email avec le
            récapitulatif de votre don, veuillez vérifier votre boite mail.
          </span>
        ),
      });
      form.reset();
      console.log("data", result.data?.id);
      router.push(`/confirmation/${result.data?.id}`);
    },
    onError: (error) => {
      if (error.error.validationErrors) {
        toast.error("Erreur de validation", {
          description: "Veuillez vérifier les champs du formulaire.",
        });
      } else {
        toast.error("Erreur serveur", {
          description: "Une erreur est survenue lors de l'envoi du formulaire.",
        });
      }
    },
  });

  const submitDonation = async (data: DonationOutput) => {
    await execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitDonation)}
        className="space-y-6 max-w-xl "
      >
        {/* Civilité ---------------------------------------------------- */}
        <FormField
          control={form.control}
          name="civility"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-input-title-foreground  font-medium text-sm">
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
                <FormLabel className="uppercase text-input-title-foreground font-medium text-sm">
                  Prénom
                </FormLabel>
                <FormControl>
                  <Input className="rounded-none" {...field} />
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
                <FormLabel className="uppercase text-input-title-foreground  font-medium text-sm">
                  Nom
                </FormLabel>
                <FormControl>
                  <Input className="rounded-none" {...field} />
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
              <FormLabel className="uppercase text-input-title-foreground font-medium text-sm">
                Âge
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-none"
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
              <FormDescription className="text-xs text-muted-foreground mt-1 font-bold">
                Nous acceptons les mèches dès 10cm, de toute nature de cheveux,
                tant qu’ils sont en bonne santé.
              </FormDescription>
              <FormLabel className="uppercase text-input-title-foreground  font-medium text-sm">
                Type de cheveux
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full rounded-none">
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

        {/* Autorisations ----------------------------------------------- */}
        <Card className="p-4 space-y-4 bg-muted/50 rounded-none">
          <div>
            <p className="font-medium text-black text-sm mb-2">
              Acceptez-vous que l’on revende vos mèches ?*
            </p>
            <p className="text-xs text-muted-foreground">
              Vous avez la possibilité de nous autoriser à vendre vos cheveux ou
              à les utiliser uniquement pour la fabrication de perruque.
              <br /> Si vous cochez la case « j’accepte que mes cheveux soient
              vendus », les fruits de la vente permettront d’offrir une aide
              financière aux personnes souhaitant acheter une perruque chez
              nous.
            </p>
          </div>
        </Card>

        <div className="mt-4 space-y-2">
          {/* allowResale */}
          <FormField
            control={form.control}
            name="allowResale"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
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
              <FormItem className="flex items-start space-x-3">
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
          <p className="text-xs italic text-muted-foreground mt-2">
            Vous pouvez cocher l’une d’entre elles ou les deux. Votre choix sera
            entièrement respecté.
          </p>
        </div>

        {/* Email -------------------------------------------------------- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-input-title-foreground  font-medium text-sm">
                Email
              </FormLabel>
              <FormControl>
                <Input className="rounded-none" type="email" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-xs text-muted-foreground mt-1 font-bold">
                Nous faisons notre possible pour répondre à toutes et tous.
                Merci de ne pas nous tenir rigueur des erreurs de la poste ou
                des éventuelles fautes de frappes dans votre adresse mail ou
                téléphone.
              </FormDescription>
            </FormItem>
          )}
        />
        {/* Message ------------------------------------------------------ */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-input-title-foreground  font-medium text-sm">
                Merci pour vos réponses et votre engagement ! <br />
                Un message à nous faire passer ?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Votre message…"
                  className="min-h-[120px] rounded-none"
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
          disabled={isPending}
          className="w-full rounded-none bg-pink-700 text-white hover:bg-pink-800 transition"
        >
          {isPending ? (
            <Loader2 className="w-full h-4 animate-spin" />
          ) : (
            "Envoyer ma promesse de don"
          )}
        </Button>
      </form>
    </Form>
  );
}
