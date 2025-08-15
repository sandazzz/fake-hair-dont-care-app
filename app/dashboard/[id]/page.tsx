import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { DonorInfoCard } from "@/components/dashboard/donation-details/donor-info";
import { HairInfoCard } from "@/components/dashboard/donation-details/hair-info";
import { SendEmailDialog } from "@/components/dashboard/donation-details/send-email-dialog";

export default async function DonationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const donation = await prisma.donation.findUnique({
    where: { id },
  });

  if (!donation) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
        </Button>
        <SendEmailDialog donation={donation} />
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <DonorInfoCard donation={donation} />

        <HairInfoCard donation={donation} />

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
      </div >
    </>)
    ;
}
