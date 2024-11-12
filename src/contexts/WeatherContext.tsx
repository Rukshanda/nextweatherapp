import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import Bottleneck from "bottleneck";

interface WeatherData {
  city_name: string;
  temp: number;
  description: string;
  timezone: string;
  local_time: string;
  day_name: string;
  date: string;
  app_temp: number;
  sunrise: string;
  sunset: string;
  code: number;
  rh: number;
  wind_spd: number;
  uv: number;
  pres: number;
  currenttime: string;
  forecast?: ForecastDay[];
  hourforecast?: ForecastHour[];
}

interface ApiForecastDay {
  valid_date: string;
  min_temp: number;
  max_temp: number;
  weather: {
    description: string;
    code: number;
  };
  wind_spd: number;
}

interface ApiForecastHour {
  datetime: string;
  valid_date: string;
  temp: number;
  weather: {
    description: string;
    code: number;
  };
  wind_spd: number;
}

interface ForecastDay {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  code: number;
  wind_spd: number;
}

interface ForecastHour {
  date: string;
  temp: number;
  description: string;
  code: number;
  wind_spd: number;
  time: number;
}

interface WeatherContextType {
  weather: WeatherData | null;
  fetchWeather: (city?: string, lat?: number, lon?: number) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000,
  });

  const fetchWeather = async (
    city: string = "Karachi",
    lat?: number,
    lon?: number
  ) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY;
    setError(null);
    const today = new Date();
    const startDate = today.toISOString().split("T")[0];
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 4);
    const endDate = futureDate.toISOString().split("T")[0];

    const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
    const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;
    const forecastHourUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;

    const lonlatcurrentWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
    const lonlatforecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;
    const lonlatforecastHourUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;

    try {
      const [currentResponse, forecastResponse, forecastHourResponse] =
        await Promise.all([
          limiter.schedule(() =>
            fetch(lat && lon ? lonlatcurrentWeatherUrl : currentWeatherUrl)
          ),
          limiter.schedule(() =>
            fetch(lat && lon ? lonlatforecastUrl : forecastUrl)
          ),
          limiter.schedule(() =>
            fetch(lat && lon ? lonlatforecastHourUrl : forecastHourUrl)
          ),
        ]);

      if (
        !currentResponse.ok ||
        !forecastResponse.ok ||
        !forecastHourResponse.ok
      ) {
        throw new Error("Failed to fetch weather data");
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();
      const forecastHourData = await forecastHourResponse.json();

      const rawTime = currentData.data[0]?.ob_time || "No time";
      const timezone = currentData.data[0]?.timezone || "UTC";
      const sunrise = currentData.data[0]?.sunrise || "00:00";
      const sunset = currentData.data[0]?.sunset || "00:00";

      const { localTime, dayName, date, formattedSunrise, formattedSunset } =
        convertToLocalTime(rawTime, timezone, sunrise, sunset);

      const forecast = forecastData.data.map((day: ApiForecastDay) => ({
        date: day.valid_date,
        temp_min: day.min_temp,
        temp_max: day.max_temp,
        description: day.weather.description,
        code: day.weather.code,
        wind_spd: day.wind_spd,
      }));

      const hourforecast = forecastHourData.data.map(
        (hour: ApiForecastHour) => {
          const formattedTime = extractTime(hour.datetime);
          return {
            date: hour.valid_date,
            temp: hour.temp,
            description: hour.weather.description,
            code: hour.weather.code,
            wind_spd: hour.wind_spd,
            time: formattedTime,
          };
        }
      );

      setWeather({
        city_name: currentData.data[0]?.city_name,
        temp: currentData.data[0]?.temp,
        description: currentData.data[0]?.weather.description,
        currenttime: extractTime(currentData.data[0]?.datetime),
        timezone,
        local_time: localTime,
        day_name: dayName,
        date,
        app_temp: currentData.data[0]?.app_temp,
        sunrise: formattedSunrise,
        sunset: formattedSunset,
        code: currentData.data[0]?.weather.code,
        rh: currentData.data[0]?.rh,
        wind_spd: currentData.data[0]?.wind_spd,
        uv: currentData.data[0]?.uv,
        pres: currentData.data[0]?.pres,
        forecast,
        hourforecast,
      });
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      console.error(error);
    }

    console.log(error);
  };

  const convertToLocalTime = (
    observationTime: string,
    timezone: string,
    sunrise: string,
    sunset: string
  ): {
    localTime: string;
    dayName: string;
    date: string;
    formattedSunrise: string;
    formattedSunset: string;
  } => {
    const date = new Date(observationTime);
    const dayName = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
    }).format(date);
    const localTime = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    const formatTime = (time: string) =>
      new Date(`1970-01-01T${time}Z`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    const formattedSunrise = formatTime(sunrise);
    const formattedSunset = formatTime(sunset);

    return {
      localTime,
      dayName,
      date: formattedDate,
      formattedSunrise,
      formattedSunset,
    };
  };

  const extractTime = (datetime: string): string => {
    if (!datetime || typeof datetime !== "string") {
      return "Invalid time";
    }

    const [date, hour] = datetime.split(":");
    if (!hour) {
      return "Invalid time";
    }

    const dateObject = new Date(`1970-01-01T${hour}:00Z`);
    return dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    console.log(date);
  };

  return (
    <WeatherContext.Provider value={{ weather, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};



export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
