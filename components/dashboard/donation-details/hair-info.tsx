"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Donation } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirmDonation } from "@/app/dashboard/confirm-donation.action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

type HairInfo = Pick<
  Donation,
  "id" | "hairTypes" | "allowResale" | "allowWigUse" | "status"
>;

export function HairInfoCard({ donation }: { donation: HairInfo }) {
  const { execute, isPending } = useAction(confirmDonation, {
    onSuccess: () => {
      toast.success("Succès", {
        description: "Le don a été confirmé avec succès",
      });
    },
    onError: (error) => {
      toast.error("Erreur", {
        description: error.error.serverError,
      });
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations sur les cheveux</CardTitle>
        <CardDescription>Détails sur les cheveux donnés</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Type de cheveux
          </p>
          <Badge className="mt-1" variant="outline">
            {donation.hairTypes}
          </Badge>
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Permissions
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              {donation.allowResale ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <X className="mr-2 h-4 w-4 text-red-500" />
              )}
              <span>Autorise la revente</span>
            </div>
            <div className="flex items-center">
              {donation.allowWigUse ? (
                <Check className="mr-2 h-4 w-4 text-green-500" />
              ) : (
                <X className="mr-2 h-4 w-4 text-red-500" />
              )}
              <span>Autorise l&apos;utilisation en perruque</span>
            </div>
          </div>
        </div>
      </CardContent>
      {donation.status === "pending" && (
        <CardFooter>
          <Button
            className="w-full"
            onClick={async () => {
              await execute({ id: donation.id });
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            Confirmer la réception du don
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
