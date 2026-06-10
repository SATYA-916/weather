import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";

export function DatePickerWrapper({ selectedDate, onChange, disabled }) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="relative w-full" data-testid="container-datepicker">
      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (date) onChange(date);
        }}
        maxDate={yesterday}
        dateFormat="MMMM d, yyyy"
        disabled={disabled}
        className="flex h-11 w-full rounded-md border border-white/40 bg-white/50 dark:bg-black/20 px-3 py-2 text-sm pl-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors placeholder:text-muted-foreground shadow-sm"
        wrapperClassName="w-full"
      />
    </div>
  );
}
