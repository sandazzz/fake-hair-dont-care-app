"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
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
import { Donation } from "@/generated/prisma";

const hairTypeOptions = [
  "Naturels (non colorés/non décolorés)",
  "Coloration Végétale",
  "Tie and Dye (ombré)",
  "Colorés",
  "Décolorés",
  "Méchés",
  "Henné (coloré/neutre)",
];

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
];

export function DonationsTable({
  donationsList,
}: {
  donationsList: Donation[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [hairTypeFilter, setHairTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [donations, setDonations] = useState<Donation[]>(donationsList);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleConfirmDonation = (id: string) => {
    // In a real app, this would call your API to update the donation status
    setDonations(
      donations.map((donation) =>
        donation.id === id ? { ...donation, status: "confirmed" } : donation
      )
    );
  };

  const handleSendEmail = (id: string, email: string) => {
    // In a real app, this would open a modal or redirect to an email form
    console.log(`Sending email to ${email} for donation ${id}`);
    alert(`Email would be sent to ${email}`);
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
    .filter((donation) =>
      statusFilter !== "all" ? donation.status === statusFilter : true
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

  // Calculate pagination
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDonations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const formatDate = (dateString: Date) => {
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
            placeholder="Search by name or order #..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
              <TableHead className="w-[100px]">Order #</TableHead>
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
              <TableHead>Status</TableHead>
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
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No donations found.
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((donation) => (
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
                        {donation.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() => handleConfirmDonation(donation.id)}
                          >
                            Confirm reception
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            handleSendEmail(donation.id, donation.email)
                          }
                        >
                          Send thank you email
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastItem, filteredDonations.length)}
          </span>{" "}
          of <span className="font-medium">{filteredDonations.length}</span>{" "}
          donations
        </div>

        <div className="flex items-center space-x-2">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages || 1}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
