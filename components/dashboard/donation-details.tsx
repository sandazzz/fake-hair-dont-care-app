"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Check, X, CheckCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import type { Donation } from "@prisma/client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { confirmDonation } from "@/app/dashboard/confirm-donation.action";
import { sendEmail } from "@/app/dashboard/send-email.action";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DonationDetailsProps {
  donation: Donation;
}

export function DonationDetails({ donation }: DonationDetailsProps) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState(
    "Merci pour votre don de cheveux"
  );
  const [emailBody, setEmailBody] = useState(
    `Cher/Chère ${donation.firstName} ${donation.lastName},\n\nNous vous remercions sincèrement pour votre don de cheveux (référence: ${donation.specialId}). Votre générosité permettra d'aider des personnes qui en ont besoin.\n\nCordialement,\nL'équipe de don de cheveux`
  );
  const { executeAsync: executeConfirmDonation } = useAction(confirmDonation);
  const { executeAsync: executeSendEmail } = useAction(sendEmail);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleConfirmDonation = async () => {
    try {
      const result = await executeConfirmDonation({ id: donation.id });

      if (result) {
        toast.success("Succès", {
          description: "Le don a été confirmé avec succès",
        });
      }
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de la confirmation du don",
      });
    }
  };

  const templates = {
    remerciement: {
      subject: "Merci pour votre don de cheveux",
      body: `Cher/Chère ${donation.firstName} ${donation.lastName},\n\nNous vous remercions sincèrement pour votre don de cheveux (référence: ${donation.specialId}). Votre générosité permettra d'aider des personnes qui en ont besoin.\n\nCordialement,\nL'équipe de don de cheveux`,
    },
    confirmation: {
      subject: "Confirmation de réception de votre don",
      body: `Cher/Chère ${donation.firstName} ${donation.lastName},\n\nNous confirmons la bonne réception de votre don de cheveux (référence: ${donation.specialId}). Nous vous remercions pour votre générosité.\n\nCordialement,\nL'équipe de don de cheveux`,
    },
  };

  const handleSendEmail = async () => {
    try {
      const result = await executeSendEmail({
        to: donation.email,
        subject: emailSubject,
        body: emailBody,
      });

      if (result?.data?.error) {
        toast.error("Erreur", {
          description: result.data.error,
        });
        return;
      }

      toast.success("Succès", {
        description: "L'email a été envoyé avec succès",
      });
      setEmailOpen(false);
    } catch (error) {
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de l'envoi de l'email",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
        <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Envoyer un email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Envoyer un email de remerciement</DialogTitle>
              <DialogDescription>
                Envoyer un email personnalisé au donateur.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Destinataire</Label>
                <Input id="recipient" value={donation.email} disabled />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSubject(templates.remerciement.subject);
                    setEmailBody(templates.remerciement.body);
                  }}
                >
                  Template Remerciement
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEmailSubject(templates.confirmation.subject);
                    setEmailBody(templates.confirmation.body);
                  }}
                >
                  Template Confirmation
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEmailOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendEmail}>Envoyer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations du donateur</CardTitle>
            <CardDescription>Détails personnels du donateur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p>
                  {donation.civility === "madame" ? "Mme" : "M."}{" "}
                  {donation.firstName} {donation.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Âge</p>
                <p>{donation.age || "Non spécifié"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{donation.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                ID du don
              </p>
              <p>{donation.specialId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Date du don
              </p>
              <p>{formatDate(donation.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Statut
              </p>
              <Badge
                variant={
                  donation.status === "confirmed" ? "default" : "secondary"
                }
                className={
                  donation.status === "confirmed" ? "bg-green-500" : ""
                }
              >
                {donation.status === "confirmed" ? "Confirmé" : "En attente"}
              </Badge>
            </div>
          </CardContent>
        </Card>

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
                  <span>Autorise l'utilisation en perruque</span>
                </div>
              </div>
            </div>
          </CardContent>
          {donation.status === "pending" && (
            <CardFooter>
              <Button className="w-full" onClick={handleConfirmDonation}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirmer la réception du don
              </Button>
            </CardFooter>
          )}
        </Card>

        {donation.message && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Message du donateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{donation.message}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
