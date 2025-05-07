"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Donation } from "@/generated/prisma";
import { fetchDonationsPage } from "@/app/dashboard/switch-donation.action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DonationsTable({
  donationsList,
}: {
  donationsList: Donation[];
}) {
  const [donations, setDonations] = useState<Donation[]>(donationsList);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handlePageChange = async (nextPage: number) => {
    const newData = await fetchDonationsPage(
      (nextPage - 1) * itemsPerPage,
      itemsPerPage
    );
    setDonations(newData); // écrase les anciens dons
    setCurrentPage(nextPage);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Page précédente</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={donations.length === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Page suivante</span>
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order #</TableHead>
              <TableHead className="w-[25%]">Nom</TableHead>
              <TableHead className="w-[25%]">Type de cheveux</TableHead>
              <TableHead className="w-[100px]">Statut</TableHead>
              <TableHead className="w-[120px]">Date de soumission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No donations found.
                </TableCell>
              </TableRow>
            ) : (
              donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.specialId}
                  </TableCell>
                  <TableCell>
                    <div className="truncate max-w-[250px]">
                      {donation.civility === "madame" ? "Mme" : "M."}{" "}
                      {donation.firstName} {donation.lastName}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate max-w-[250px] text-xs text-muted-foreground">
                            {donation.email}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{donation.email}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className="max-w-[200px] truncate"
                          >
                            {donation.hairTypes}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{donation.hairTypes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        donation.status === "confirmed"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        donation.status === "confirmed" ? "bg-green-500" : ""
                      }
                    >
                      {donation.status === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(donation.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
