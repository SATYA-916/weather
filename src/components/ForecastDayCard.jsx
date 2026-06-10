import { format, parseISO } from "date-fns";
import { Cloud, Droplets, Sun, CloudRain, Snowflake, CloudLightning, Wind, ArrowUp, ArrowDown } from "lucide-react";
import { getWeatherLabel } from "@/lib/weather";
import { motion } from "framer-motion";

function getIcon(code, size = "h-7 w-7") {
  if (code === 0) return <Sun className={`${size} text-amber-400`} />;
  if ([1, 2, 3].includes(code)) return <Cloud className={`${size} text-slate-400`} />;
  if ([45, 48].includes(code)) return <Wind className={`${size} text-slate-300`} />;
  if ([51, 53, 55].includes(code)) return <CloudRain className={`${size} text-blue-400`} />;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className={`${size} text-blue-500`} />;
  if ([71, 73, 75].includes(code)) return <Snowflake className={`${size} text-sky-200`} />;
  if ([95, 96, 99].includes(code)) return <CloudLightning className={`${size} text-purple-500`} />;
  return <Cloud className={`${size} text-slate-400`} />;
}

export function ForecastDayCard({ day, index, isToday }) {
  const date = parseISO(day.date);
  const label = isToday ? "Today" : format(date, "EEE");
  const fullDate = format(date, "MMM d");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all
        ${isToday
          ? "bg-primary/10 border-primary/30 shadow-md"
          : "bg-white/30 dark:bg-black/10 border-white/20 hover:bg-white/50 dark:hover:bg-black/20"
        }`}
      data-testid={`forecast-day-card-${index}`}
    >
      <span className={`text-xs font-bold uppercase tracking-widest ${isToday ? "text-primary" : "text-muted-foreground"}`}>
        {label}
      </span>
      <span className="text-xs text-muted-foreground">{fullDate}</span>

      <div className="my-1">{getIcon(day.weathercode)}</div>

      <span className="text-xs text-center text-muted-foreground leading-tight">
        {getWeatherLabel(day.weathercode)}
      </span>

      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-0.5 text-red-500">
          <ArrowUp className="h-3 w-3" />
          <span className="text-sm font-bold">{day.temperature_2m_max}°</span>
        </div>
        <div className="flex items-center gap-0.5 text-blue-500">
          <ArrowDown className="h-3 w-3" />
          <span className="text-sm font-bold">{day.temperature_2m_min}°</span>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Droplets className="h-3 w-3 text-blue-400" />
        <span>{day.precipitation_sum} mm</span>
      </div>
    </motion.div>
  );
}
