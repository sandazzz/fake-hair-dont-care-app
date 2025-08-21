"use client";

import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { sendEmail } from "@/app/dashboard/send-email.action";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { Donation } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SendEmailDialog({ donation }: { donation: Donation }) {
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState(
    "Merci pour votre don de cheveux"
  );
  const [emailBody, setEmailBody] = useState(
    `Cher/Chère ${donation.firstName} ${donation.lastName},\n\nNous vous remercions sincèrement pour votre don de cheveux (référence: ${donation.specialId}). Votre générosité permettra d'aider des personnes qui en ont besoin.\n\nCordialement,\nL'équipe de don de cheveux`
  );

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

  const { execute, isPending } = useAction(sendEmail, {
    onSuccess: () => {
      toast.success("Succès", {
        description: "L'email a été envoyé avec succès",
      });
      setEmailOpen(false);
      setEmailSubject(templates.remerciement.subject);
      setEmailBody(templates.remerciement.body);
    },
    onError: (error) => {
      toast.error("Erreur", {
        description: error.error.serverError,
      });
    },
  });

  return (
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
          <Button
            variant="outline"
            onClick={() => {
              setEmailOpen(false);
              setEmailSubject(templates.remerciement.subject);
              setEmailBody(templates.remerciement.body);
            }}
          >
            Annuler
          </Button>
          <Button
            className="w-24"
            disabled={isPending}
            onClick={() =>
              execute({
                to: donation.email,
                subject: emailSubject,
                body: emailBody,
              })
            }
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Envoyer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
