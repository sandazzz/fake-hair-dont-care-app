"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Donation } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { searchDonation } from "@/app/dashboard/search-donation.action";
import { TableHeaderComponent } from "./table-header";
import { DonationRow } from "./donation-row";
import { SearchBar } from "./search-bar";

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

  const handleRowClick = useCallback(
    (id: string) => {
      router.push(`/dashboard/${id}`);
    },
    [router]
  );

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

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!value.trim()) {
        setDonations(donationsList);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        debouncedSearch(value);
      }, 2000);
    },
    [debouncedSearch, donationsList]
  );

  return (
    <div className="w-full space-y-4">
      <SearchBar value={inputValue} onChange={handleSearch} />

      <div className="w-full rounded-md border overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeaderComponent />
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
                    <DonationRow
                      key={donation.id}
                      donation={donation}
                      onRowClick={handleRowClick}
                    />
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
