# 🌦️ Weather History & Forecast

<div align="center">

### Explore Historical Weather Data and Future Forecasts

🔗 **Live Demo:** https://weather-bay-mu-28.vercel.app/

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Open-Meteo](https://img.shields.io/badge/API-OpenMeteo-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

---

## ✨ Features

- 🔍 Search weather by city name
- 📅 View historical weather for any selected date
- 📈 Interactive hourly weather charts
- 🌡️ Temperature trends and analytics
- 🌦️ 7-day weather forecast
- 💨 Wind speed and precipitation tracking
- 📱 Fully responsive design
- ⚡ Fast and lightweight Vite application

---

## 🚀 Live Demo

**Production Deployment**

👉 https://weather-bay-mu-28.vercel.app/

---

## 🏗️ System Architecture

```mermaid
flowchart TD

A[User] --> B[Search City]

B --> C[Geocoding API]
C --> D[Latitude & Longitude]

D --> E[Historical Weather API]
D --> F[Forecast Weather API]

E --> G[Weather History View]
F --> H[Forecast Dashboard]

G --> I[Charts & Analytics]
H --> I

I --> J[Interactive UI]
```

---

## 📂 Project Structure

```mermaid
graph TD

ROOT[weather-history]

ROOT --> SRC[src]
ROOT --> PUBLIC[public]

SRC --> APP[App.jsx]
SRC --> PAGES[pages]
SRC --> COMPONENTS[components]
SRC --> LIB[lib]

PAGES --> HOME[Home.jsx]

COMPONENTS --> SEARCH[SearchBar]
COMPONENTS --> DATE[DatePicker]
COMPONENTS --> WEATHER[WeatherCard]
COMPONENTS --> HOURLY[HourlyChart]
COMPONENTS --> FORECAST[ForecastChart]
COMPONENTS --> DAYCARD[ForecastDayCard]

LIB --> API[Weather API Services]
```

---

## 🔄 Application Flow

```mermaid
sequenceDiagram

participant User
participant App
participant GeoAPI
participant WeatherAPI

User->>App: Enter city name
App->>GeoAPI: Get coordinates
GeoAPI-->>App: Latitude & Longitude

App->>WeatherAPI: Historical Weather Request
WeatherAPI-->>App: Historical Data

App->>WeatherAPI: Forecast Request
WeatherAPI-->>App: Forecast Data

App-->>User: Display Charts & Weather Info
```

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React 19 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | Radix UI |
| Charts | Recharts |
| Animations | Framer Motion |
| State/Data Fetching | TanStack Query |
| Date Handling | date-fns |
| Routing | Wouter |
| Weather Data | Open-Meteo API |

---

## 📸 Main Features

### Historical Weather
- Select any previous date
- View temperature statistics
- Analyze hourly weather conditions
- Explore weather trends

### Forecast Dashboard
- Multi-day forecast
- Daily weather summaries
- Rainfall prediction
- Wind speed tracking

### Visual Analytics
- Interactive charts
- Temperature trends
- Weather condition insights
- Clean and responsive UI

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-history.git
cd weather-history
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 API Usage

The application uses:

- Open-Meteo Geocoding API
- Open-Meteo Historical Weather API
- Open-Meteo Forecast API

```mermaid
flowchart LR

A[City Name]
--> B[Geocoding]

B --> C[Coordinates]

C --> D[Historical Weather]
C --> E[Forecast Weather]

D --> F[UI]
E --> F
```

---

## 📱 Responsive Design

✅ Desktop  
✅ Laptop  
✅ Tablet  
✅ Mobile  

---

## 🚀 Deployment

This project is deployed on **Vercel**.

### Deploy Yourself

```bash
npm run build
```

Upload the generated `dist` folder to:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository  
🍴 Fork the project  
📢 Share it with others

---

<div align="center">

### Built with React + Vite + Open-Meteo

🌦️ Weather History & Forecast Dashboard

**Live:** https://weather-bay-mu-28.vercel.app/

</div>
