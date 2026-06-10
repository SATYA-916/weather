import { AlertCircle } from "lucide-react";

export function ErrorCard({ message }) {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col items-center justify-center text-center text-destructive w-full max-w-lg mx-auto" data-testid="error-card">
      <AlertCircle className="h-12 w-12 mb-3 opacity-90" />
      <h3 className="font-semibold text-lg mb-1">We ran into an issue</h3>
      <p className="text-sm opacity-90 text-foreground">{message}</p>
    </div>
  );
}
