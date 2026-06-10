import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full" data-testid="search-form">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a city..."
          className="pl-9 h-11 bg-white/50 dark:bg-black/20 border-white/40 focus-visible:ring-primary/50 placeholder:text-muted-foreground"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          data-testid="input-city-search"
        />
      </div>
      <Button type="submit" disabled={disabled || !value.trim()} className="h-11 px-6 shadow-sm" data-testid="button-submit-search">
        Search
      </Button>
    </form>
  );
}
