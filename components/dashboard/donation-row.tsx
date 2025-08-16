import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Donation } from "@/generated/prisma";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

interface DonationRowProps {
  donation: Donation;
  onRowClick: (id: string) => void;
}

export function DonationRow({ donation, onRowClick }: DonationRowProps) {
  return (
    <TableRow
      key={donation.id}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => onRowClick(donation.id)}
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
                <Badge variant="outline" className="truncate max-w-full">
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
          variant={donation.status === "confirmed" ? "default" : "secondary"}
          className={donation.status === "confirmed" ? "bg-green-500" : ""}
        >
          {donation.status === "confirmed" ? "Confirmé" : "En attente"}
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
          onClick={() => onRowClick(donation.id)}
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Voir les détails</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
