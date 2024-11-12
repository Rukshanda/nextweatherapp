import React, { useEffect, useState } from "react";
import CountryDetails from "./CountryDetails";
import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { useWeather } from "@/contexts/WeatherContext";
import Loader from "./Loader";

function Body() {
  const { fetchWeather } = useWeather();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchWeather();
      setLoading(false); 
    };

    fetchData();
  }, [fetchWeather]);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="max-w-[1600px] w-full flex flex-col justify-center">
        <div className="p-[20px] sm:p-8 flex flex-col lg:flex-row gap-[5px] sm:gap-[60px] justify-center">
          <CountryDetails />
          <WeatherDetails />
        </div>
        <div className="p-[20px] sm:p-8 flex flex-col lg:flex-row gap-[5px] sm:gap-[60px] justify-center">
          <DailyForecast />
          <HourlyForecast />
        </div>
      </div>
    </div>
  );
}

export default Body;
