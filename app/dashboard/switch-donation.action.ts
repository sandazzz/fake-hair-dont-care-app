"use server";

import { prisma } from "@/lib/prisma";

export async function fetchDonationsPage(skip = 0, take = 20) {
  return await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}
