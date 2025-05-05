"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  Check,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - in a real app, this would come from your database
const donations = [
  {
    id: "don_1",
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
    createdAt: "2023-09-15T10:30:00Z",
  },
  {
    id: "don_2",
    specialId: "HD12346",
    civility: "madame",
    firstName: "Sophie",
    lastName: "Martin",
    age: 34,
    hairTypes: "Colorés",
    email: "sophie.martin@example.com",
    allowResale: false,
    allowWigUse: true,
    wantsConfirmation: true,
    createdAt: "2023-09-14T14:20:00Z",
  },
  {
    id: "don_3",
    specialId: "HD12347",
    civility: "monsieur",
    firstName: "Thomas",
    lastName: "Bernard",
    age: 42,
    hairTypes: "Méchés",
    email: "thomas.bernard@example.com",
    allowResale: true,
    allowWigUse: false,
    wantsConfirmation: false,
    createdAt: "2023-09-13T09:15:00Z",
  },
  {
    id: "don_4",
    specialId: "HD12348",
    civility: "madame",
    firstName: "Julie",
    lastName: "Petit",
    age: 25,
    hairTypes: "Tie and Dye (ombré)",
    email: "julie.petit@example.com",
    allowResale: true,
    allowWigUse: true,
    wantsConfirmation: false,
    createdAt: "2023-09-12T16:45:00Z",
  },
  {
    id: "don_5",
    specialId: "HD12349",
    civility: "monsieur",
    firstName: "Nicolas",
    lastName: "Robert",
    age: 31,
    hairTypes: "Naturels (non colorés/non décolorés)",
    email: "nicolas.robert@example.com",
    allowResale: false,
    allowWigUse: false,
    wantsConfirmation: true,
    createdAt: "2023-09-11T11:30:00Z",
  },
];

const hairTypeOptions = [
  "Naturels (non colorés/non décolorés)",
  "Coloration Végétale",
  "Tie and Dye (ombré)",
  "Colorés",
  "Décolorés",
  "Méchés",
  "Henné (coloré/neutre)",
];

export function DonationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hairTypeFilter, setHairTypeFilter] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredDonations = donations
    .filter((donation) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        donation.firstName.toLowerCase().includes(searchLower) ||
        donation.lastName.toLowerCase().includes(searchLower) ||
        donation.email.toLowerCase().includes(searchLower) ||
        donation.specialId.toLowerCase().includes(searchLower)
      );
    })
    .filter((donation) =>
      hairTypeFilter ? donation.hairTypes === hairTypeFilter : true
    )
    .sort((a, b) => {
      if (sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortField === "name") {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }

      return 0;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search donations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={hairTypeFilter} onValueChange={setHairTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by hair type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All hair types</SelectItem>
              {hairTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Hair Type</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                <div className="flex items-center">
                  Date
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No donations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.specialId}
                  </TableCell>
                  <TableCell>
                    <div>
                      {donation.civility === "madame" ? "Mme" : "M."}{" "}
                      {donation.firstName} {donation.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {donation.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{donation.hairTypes}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs">
                        {donation.allowResale ? (
                          <Check className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <X className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        Resale
                      </div>
                      <div className="flex items-center text-xs">
                        {donation.allowWigUse ? (
                          <Check className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <X className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        Wig Use
                      </div>
                      <div className="flex items-center text-xs">
                        {donation.wantsConfirmation ? (
                          <Check className="mr-1 h-3 w-3 text-green-500" />
                        ) : (
                          <X className="mr-1 h-3 w-3 text-red-500" />
                        )}
                        Confirmation
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(donation.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/${donation.id}`}>
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Export data</DropdownMenuItem>
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">{filteredDonations.length}</span> of{" "}
          <span className="font-medium">{donations.length}</span> donations
        </div>
        <Button variant="outline" size="sm" disabled={true}>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={true}>
          Next
        </Button>
      </div>
    </div>
  );
}
