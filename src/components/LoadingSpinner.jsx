import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-primary" data-testid="loading-spinner">
      <Loader2 className="h-10 w-10 animate-spin opacity-80" />
      <p className="mt-4 text-sm font-medium opacity-80 text-foreground">Gathering weather data...</p>
    </div>
  );
}
