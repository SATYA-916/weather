import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

export function HourlyChart({ weatherData }) {
  const data = weatherData.hourly.time.map((timeStr, index) => ({
    time: format(parseISO(timeStr), "HH:mm"),
    temperature: weatherData.hourly.temperature_2m[index],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6 md:p-8 w-full mt-6 shadow-xl"
      data-testid="hourly-chart-container"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Hourly Temperature</h3>
        <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">°Celsius</span>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickMargin={10}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickMargin={10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                color: "hsl(var(--foreground))"
              }}
              itemStyle={{ color: "hsl(var(--primary))", fontWeight: "bold" }}
              labelStyle={{ fontWeight: "600", marginBottom: "4px", color: "hsl(var(--muted-foreground))" }}
              formatter={(value) => [`${value}°C`, "Temp"]}
            />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTemp)"
              activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "hsl(var(--background))", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
