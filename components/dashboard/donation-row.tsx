import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Donation } from "@prisma/client";
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
      className="hover:bg-white/10 backdrop-blur-sm border border-white/60 cursor-pointer"
      onClick={() => onRowClick(donation.id)}
    >
      <TableCell className="px-2 py-4 whitespace-nowrap text-sm font-medium text-background">
        {donation.specialId}
      </TableCell>
      <TableCell className="px-2 py-4 text-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[250px] lg:max-w-xs xl:max-w-sm 2xl:max-w-md truncate text-background">
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
                <Badge variant="outline" className="truncate max-w-full text-background bg-white/10 backdrop-blur-sm border border-white/60">
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
      <TableCell className="px-2 py-4 whitespace-nowrap text-sm text-background">
        {formatDate(donation.createdAt)}
      </TableCell>
    </TableRow>
  );
}
