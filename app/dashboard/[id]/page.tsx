import { DonationDetails } from "@/components/dashboard/donation-details";

export default async function DonationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DonationDetails id={id} />;
}
