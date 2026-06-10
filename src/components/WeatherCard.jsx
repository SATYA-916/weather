import { format } from "date-fns";
import { Cloud, Droplets, Sun, CloudRain, Snowflake, CloudLightning, Wind, Thermometer, MapPin } from "lucide-react";
import { getWeatherLabel } from "@/lib/weather";
import { motion } from "framer-motion";

export function WeatherCard({ weatherData, location, date }) {
  const daily = weatherData.daily;
  const weatherCode = daily.weathercode[0];
  const condition = getWeatherLabel(weatherCode);

  const getIcon = (code) => {
    if (code === 0) return <Sun className="h-12 w-12 text-accent" />;
    if ([1, 2, 3].includes(code)) return <Cloud className="h-12 w-12 text-slate-400" />;
    if ([45, 48].includes(code)) return <Wind className="h-12 w-12 text-slate-300" />;
    if ([51, 53, 55].includes(code)) return <CloudRain className="h-12 w-12 text-blue-400" />;
    if ([61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className="h-12 w-12 text-blue-500" />;
    if ([71, 73, 75].includes(code)) return <Snowflake className="h-12 w-12 text-slate-200" />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className="h-12 w-12 text-purple-500" />;
    return <Cloud className="h-12 w-12 text-slate-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 md:p-8 w-full shadow-xl overflow-hidden relative"
      data-testid="weather-summary-card"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent opacity-80" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-border/50 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-medium mb-1">
            <MapPin className="h-4 w-4" />
            <h2 className="text-xl tracking-tight" data-testid="text-location-name">
              {location.name}{location.admin1 ? `, ${location.admin1}` : ""}, {location.country}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-medium" data-testid="text-selected-date">
            {format(date, "EEEE, MMMM do, yyyy")}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/40 dark:bg-black/20 px-5 py-3 rounded-xl border border-white/20">
          {getIcon(weatherCode)}
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Condition</span>
            <span className="text-lg font-bold text-foreground" data-testid="text-weather-condition">{condition}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatItem
          icon={<Thermometer className="h-5 w-5 text-red-500" />}
          label="Max Temp"
          value={`${daily.temperature_2m_max[0]}°C`}
          testId="stat-max-temp"
        />
        <StatItem
          icon={<Thermometer className="h-5 w-5 text-blue-500" />}
          label="Min Temp"
          value={`${daily.temperature_2m_min[0]}°C`}
          testId="stat-min-temp"
        />
        <StatItem
          icon={<Thermometer className="h-5 w-5 text-orange-500" />}
          label="Avg Temp"
          value={`${daily.temperature_2m_mean[0]}°C`}
          testId="stat-avg-temp"
        />
        <StatItem
          icon={<Droplets className="h-5 w-5 text-blue-400" />}
          label="Rainfall"
          value={`${daily.precipitation_sum[0]} mm`}
          testId="stat-rainfall"
        />
      </div>
    </motion.div>
  );
}

function StatItem({ icon, label, value, testId }) {
  return (
    <div className="flex flex-col p-4 rounded-xl bg-white/30 dark:bg-black/10 border border-white/20 items-start gap-2" data-testid={testId}>
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-2xl font-bold text-foreground">{value}</span>
    </div>
  );
}
