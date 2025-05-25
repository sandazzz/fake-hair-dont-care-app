import { prisma } from "@/lib/prisma";
import { DonationDetails } from "@/components/dashboard/donation-details";
import { notFound } from "next/navigation";

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

  return <DonationDetails donation={donation} />;
}
