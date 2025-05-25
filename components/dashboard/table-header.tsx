import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableHeaderComponent() {
  return (
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
  );
}
