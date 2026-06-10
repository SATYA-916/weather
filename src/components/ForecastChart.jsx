import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

export function ForecastChart({ forecastData }) {
  const daily = forecastData.daily;
  const today = format(new Date(), "yyyy-MM-dd");

  const data = daily.time.map((dateStr, i) => ({
    date: format(parseISO(dateStr), "EEE MMM d"),
    rawDate: dateStr,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    mean: daily.temperature_2m_mean[i],
  }));

  const todayIndex = daily.time.findIndex((d) => d === today);
  const todayLabel = todayIndex >= 0 ? data[todayIndex].date : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl p-6 md:p-8 w-full mt-6 shadow-xl"
      data-testid="forecast-chart-container"
    >
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-bold text-foreground">7-Day Temperature Forecast</h3>
        <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">°Celsius</span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickMargin={8}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value, name) => [
                `${value}°C`,
                name === "max" ? "High" : name === "min" ? "Low" : "Avg",
              ]}
              labelStyle={{ fontWeight: "600", marginBottom: "4px", color: "hsl(var(--muted-foreground))" }}
            />
            <Legend
              formatter={(value) => value === "max" ? "High" : value === "min" ? "Low" : "Avg"}
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
            {todayLabel && (
              <ReferenceLine
                x={todayLabel}
                stroke="hsl(var(--primary))"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{ value: "Today", position: "top", fontSize: 11, fill: "hsl(var(--primary))", fontWeight: 600 }}
              />
            )}
            <Line
              type="monotone"
              dataKey="max"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="mean"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
