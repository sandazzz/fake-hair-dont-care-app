"use client";
import Link from "next/link";
import { ArrowLeft, Mail, Download, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

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
    createdAt: "2023-09-15T10:30:00Z",
  };
};

export function DonationDetails({ id }: { id: string }) {
  const donation = getDonation(id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Donation Details"
        text={`Viewing donation ${donation.specialId}`}
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

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
    </DashboardShell>
  );
}
