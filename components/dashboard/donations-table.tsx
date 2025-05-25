"use client";

import { useState, useCallback, useRef } from "react";
import { Info, Loader2 } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useAction } from "next-safe-action/hooks";
import { searchDonation } from "@/app/dashboard/search-donation.action";

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function DonationsTable({
  donationsList,
}: {
  donationsList: Donation[];
}) {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>(donationsList);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { executeAsync } = useAction(searchDonation);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Fonction de recherche avec debounce
  const debouncedSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      try {
        const result = await executeAsync({ query });
        if (result?.data) {
          setDonations(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [executeAsync]
  );

  // Gestionnaire de changement avec debounce
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // Annuler le timeout précédent s'il existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Si l'input est vide, réinitialiser la liste
      if (!value.trim()) {
        setDonations(donationsList);
        return;
      }

      // Créer un nouveau timeout
      timeoutRef.current = setTimeout(() => {
        debouncedSearch(value);
      }, 2000);
    },
    [debouncedSearch, donationsList]
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="controlled-input" className="sr-only">
          Rechercher un don
        </Label>
        <Input
          id="controlled-input"
          type="text"
          value={inputValue}
          onChange={handleSearch}
          placeholder="Rechercher un don..."
          className="w-full"
        />
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : donations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun don trouvé.
                    </TableCell>
                  </TableRow>
                ) : (
                  donations.map((donation) => (
                    <TableRow
                      key={donation.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={(id) => router.push(`/dashboard/${id}`)}
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
                            ? "Confirmé"
                            : "En attente"}
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
                          className="h-8 w-8 cursor-pointer"
                          onClick={() =>
                            router.push(`/dashboard/${donation.id}`)
                          }
                        >
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Voir les détails</span>
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
