import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="controlled-input" className="sr-only">
        Rechercher un don
      </Label>
      <Input
        id="controlled-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Rechercher un don..."
        className="w-full"
      />
    </div>
  );
}
