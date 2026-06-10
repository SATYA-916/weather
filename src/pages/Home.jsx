import { useState } from "react";
import { format } from "date-fns";
import { History, TrendingUp, CloudRainWind } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { DatePickerWrapper } from "@/components/DatePickerWrapper";
import { WeatherCard } from "@/components/WeatherCard";
import { HourlyChart } from "@/components/HourlyChart";
import { ForecastDayCard } from "@/components/ForecastDayCard";
import { ForecastChart } from "@/components/ForecastChart";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorCard } from "@/components/ErrorCard";
import { geocodeCity, getHistoricalWeather, getForecast } from "@/lib/weather";

export function Home() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [activeTab, setActiveTab] = useState("history");
  const [selectedDate, setSelectedDate] = useState(yesterday);
  const [location, setLocation] = useState(null);

  const [historyData, setHistoryData] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(null);

  const [forecastData, setForecastData] = useState(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState(null);

  const fetchHistory = async (geo, date) => {
    setHistoryLoading(true);
    setHistoryError(null);
    setHistoryData(null);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const weather = await getHistoricalWeather(geo.latitude, geo.longitude, dateStr);
      setHistoryData(weather);
    } catch (err) {
      setHistoryError(err.message || "Could not load historical data.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchForecastData = async (geo) => {
    setForecastLoading(true);
    setForecastError(null);
    setForecastData(null);
    try {
      const data = await getForecast(geo.latitude, geo.longitude);
      setForecastData(data);
    } catch (err) {
      setForecastError(err.message || "Could not load forecast data.");
    } finally {
      setForecastLoading(false);
    }
  };

  const handleSearch = async (city) => {
    setHistoryData(null);
    setForecastData(null);
    setHistoryError(null);
    setForecastError(null);

    let geo;
    try {
      geo = await geocodeCity(city);
      setLocation(geo);
    } catch (err) {
      setLocation(null);
      setHistoryError(err.message || "City not found.");
      setForecastError(err.message || "City not found.");
      return;
    }

    // Fetch both in parallel
    fetchHistory(geo, selectedDate);
    fetchForecastData(geo);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (location) fetchHistory(location, date);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const loading = activeTab === "history" ? historyLoading : forecastLoading;
  const error = activeTab === "history" ? historyError : forecastError;
  const hasCity = !!location;

  // Build forecast day objects
  const forecastDays = forecastData
    ? forecastData.daily.time.map((date, i) => ({
        date,
        temperature_2m_max: forecastData.daily.temperature_2m_max[i],
        temperature_2m_min: forecastData.daily.temperature_2m_min[i],
        temperature_2m_mean: forecastData.daily.temperature_2m_mean[i],
        precipitation_sum: forecastData.daily.precipitation_sum[i],
        windspeed_10m_max: forecastData.daily.windspeed_10m_max[i],
        weathercode: forecastData.daily.weathercode[i],
      }))
    : [];

  const todayStr = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="min-h-screen w-full flex flex-col py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 mt-6" data-testid="header-section">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <CloudRainWind className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            Weather History
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Explore past weather or predict what's coming next.
          </p>
        </div>

        {/* Controls */}
        <div className="sticky top-4 z-20 glass-card w-full rounded-2xl p-4 mb-6 shadow-md flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <SearchBar onSearch={handleSearch} disabled={historyLoading || forecastLoading} />
            </div>
            {activeTab === "history" && (
              <div className="w-full md:w-64">
                <DatePickerWrapper
                  selectedDate={selectedDate}
                  onChange={handleDateChange}
                  disabled={historyLoading || forecastLoading}
                />
              </div>
            )}
          </div>

          {/* Mode tabs */}
          <div className="flex gap-2 self-start" data-testid="mode-tabs">
            <button
              onClick={() => handleTabChange("history")}
              data-testid="tab-history"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                ${activeTab === "history"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              <History className="h-3.5 w-3.5" />
              History
            </button>
            <button
              onClick={() => handleTabChange("forecast")}
              data-testid="tab-forecast"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all
                ${activeTab === "forecast"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Forecast
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full relative min-h-[400px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 rounded-2xl">
              <LoadingSpinner />
            </div>
          )}

          {error && !loading && (
            <div className="pt-4">
              <ErrorCard message={error} />
            </div>
          )}

          {!hasCity && !loading && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
              <CloudRainWind className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium text-foreground">Ready to explore</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                Search for a city to see its weather {activeTab === "forecast" ? "forecast" : "history"}.
              </p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* History Tab */}
            {activeTab === "history" && historyData && location && !historyLoading && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full pb-10 flex flex-col"
              >
                <WeatherCard weatherData={historyData} location={location} date={selectedDate} />
                <HourlyChart weatherData={historyData} />
              </motion.div>
            )}

            {/* Forecast Tab */}
            {activeTab === "forecast" && forecastData && location && !forecastLoading && (
              <motion.div
                key="forecast"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full pb-10 flex flex-col"
              >
                {/* Location + label */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card rounded-2xl px-6 py-4 mb-4 flex items-center justify-between shadow-md"
                  data-testid="forecast-header"
                >
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-0.5">7-Day Forecast</p>
                    <h2 className="text-xl font-bold text-foreground">
                      {location.name}{location.admin1 ? `, ${location.admin1}` : ""}, {location.country}
                    </h2>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary opacity-60" />
                </motion.div>

                {/* Daily cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-2" data-testid="forecast-days-grid">
                  {forecastDays.map((day, i) => (
                    <ForecastDayCard
                      key={day.date}
                      day={day}
                      index={i}
                      isToday={day.date === todayStr}
                    />
                  ))}
                </div>

                {/* Forecast chart */}
                <ForecastChart forecastData={forecastData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default Home;
