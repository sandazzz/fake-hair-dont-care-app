import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableHeaderComponent() {
  return (
    <TableHeader className="bg-white/10 backdrop-blur-sm border border-white/60">
      <TableRow>
        <TableHead className="w-24 2xl:w-32 px-2 py-3 text-left text-xs font-medium text-background uppercase tracking-wider">
          Order #
        </TableHead>
        <TableHead className="w-1/4 px-2 py-3 text-left text-xs font-medium text-background uppercase tracking-wider">
          Nom
        </TableHead>
        <TableHead className="w-1/3 px-2 py-3 text-left text-xs font-medium text-background uppercase tracking-wider">
          Type de cheveux
        </TableHead>
        <TableHead className="w-24 px-2 py-3 text-left text-xs font-medium text-background uppercase tracking-wider">
          Statut
        </TableHead>
        <TableHead className="w-32 px-2 py-3 text-left text-xs font-medium text-background uppercase tracking-wider">
          Date
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
