import { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface SearchBarProps {
  data: any[];
  onSearch: (filtered: any[]) => void;
  searchFields: string[];
  placeholder?: string;
}

const SearchBar = ({ data, onSearch, searchFields, placeholder = "Search..." }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = data.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    onSearch(filtered);
  }, [searchQuery, data, searchFields, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Command className="border rounded-lg">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder={placeholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </Command>
    </div>
  );
};

export default SearchBar;