"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

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
import type { Donation } from "@prisma/client";
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
  const router = useRouter();
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

  const goToDetails = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className="w-full space-y-4">
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

      <div className="w-full rounded-md border overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 2xl:w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order #
                  </TableHead>
                  <TableHead className="w-1/4 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </TableHead>
                  <TableHead className="w-1/3 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type de cheveux
                  </TableHead>
                  <TableHead className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </TableHead>
                  <TableHead className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </TableHead>
                  <TableHead className="w-16 px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Détails
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white divide-y divide-gray-200">
                {donations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No donations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  donations.map((donation) => (
                    <TableRow
                      key={donation.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => goToDetails(donation.id)}
                    >
                      <TableCell className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                        {donation.specialId}
                      </TableCell>
                      <TableCell className="px-2 py-4 text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[250px] lg:max-w-xs xl:max-w-sm 2xl:max-w-md truncate">
                                {donation.civility === "madame" ? "Mme" : "M."}{" "}
                                {donation.firstName} {donation.lastName}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {donation.civility === "madame" ? "Mme" : "M."}{" "}
                                {donation.firstName} {donation.lastName}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[250px] lg:max-w-xs xl:max-w-sm 2xl:max-w-md truncate text-xs text-muted-foreground">
                                {donation.email}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{donation.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="px-2 py-4 text-sm">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[250px] lg:max-w-xs xl:max-w-sm 2xl:max-w-md">
                                <Badge
                                  variant="outline"
                                  className="truncate max-w-full"
                                >
                                  {donation.hairTypes}
                                </Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{donation.hairTypes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="px-2 py-4 whitespace-nowrap text-sm">
                        <Badge
                          variant={
                            donation.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            donation.status === "confirmed"
                              ? "bg-green-500"
                              : ""
                          }
                        >
                          {donation.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 py-4 whitespace-nowrap text-sm">
                        {formatDate(donation.createdAt)}
                      </TableCell>
                      <TableCell
                        className="px-2 py-4 whitespace-nowrap text-sm text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => goToDetails(donation.id)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
