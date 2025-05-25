"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Check, X, CheckCircle } from "lucide-react";

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

// Mock data - in a real app, this would be fetched from your API
const getDonation = (id: string) => {
  return {
    id,
    specialId: "HD12345",
    civility: "madame",
    firstName: "Marie",
    lastName: "Dupont",
    age: 28,
    hairTypes: "Naturels (non colorés/non décolorés)",
    email: "marie.dupont@example.com",
    allowResale: true,
    allowWigUse: true,
    wantsConfirmation: true,
    message:
      "Je suis heureuse de pouvoir faire ce don et aider quelqu'un qui en a besoin.",
    status: "pending",
    createdAt: "2023-09-15T10:30:00Z",
  };
};

export function DonationDetails({ id }: { id: string }) {
  const [donation, setDonation] = useState(getDonation(id));
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState(
    "Merci pour votre don de cheveux"
  );
  const [emailBody, setEmailBody] = useState(
    `Cher/Chère ${donation.firstName} ${donation.lastName},\n\nNous vous remercions sincèrement pour votre don de cheveux (référence: ${donation.specialId}). Votre générosité permettra d'aider des personnes qui en ont besoin.\n\nCordialement,\nL'équipe de don de cheveux`
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleConfirmDonation = () => {
    // In a real app, this would call your API to update the donation status
    setDonation({ ...donation, status: "confirmed" });
  };

  const handleSendEmail = () => {
    // In a real app, this would call your API to send the email
    console.log("Sending email:", {
      to: donation.email,
      subject: emailSubject,
      body: emailBody,
    });
    alert(`Email sent to ${donation.email}`);
    setEmailOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Send Thank You Email</DialogTitle>
              <DialogDescription>
                Send a personalized thank you email to the donor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input id="recipient" value={donation.email} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
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
                Cancel
              </Button>
              <Button onClick={handleSendEmail}>Send Email</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
            <CardDescription>Personal details of the donor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Name
                </p>
                <p>
                  {donation.civility === "madame" ? "Mme" : "M."}{" "}
                  {donation.firstName} {donation.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Age</p>
                <p>{donation.age || "Not specified"}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{donation.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Donation ID
              </p>
              <p>{donation.specialId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Date of Donation
              </p>
              <p>{formatDate(donation.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge
                variant={
                  donation.status === "confirmed" ? "default" : "secondary"
                }
                className={
                  donation.status === "confirmed" ? "bg-green-500" : ""
                }
              >
                {donation.status === "confirmed" ? "Confirmed" : "Pending"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hair Information</CardTitle>
            <CardDescription>Details about the donated hair</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Hair Type
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
                  <span>Allow Resale</span>
                </div>
                <div className="flex items-center">
                  {donation.allowWigUse ? (
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <X className="mr-2 h-4 w-4 text-red-500" />
                  )}
                  <span>Allow Wig Use</span>
                </div>
                <div className="flex items-center">
                  {donation.wantsConfirmation ? (
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <X className="mr-2 h-4 w-4 text-red-500" />
                  )}
                  <span>Wants Confirmation</span>
                </div>
              </div>
            </div>
          </CardContent>
          {donation.status === "pending" && (
            <CardFooter>
              <Button className="w-full" onClick={handleConfirmDonation}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Donation Reception
              </Button>
            </CardFooter>
          )}
        </Card>

        {donation.message && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Donor Message</CardTitle>
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
