import React, { useEffect, useState, useRef } from "react";
import CountryDetails from "./CountryDetails";
import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import { useWeather } from "@/contexts/WeatherContext";
import Loader from "./Loader";

function Body() {
  const { fetchWeather } = useWeather();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);   
  const hasPageReloaded = useRef(false);  

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Client-side rendering");

       if (window.performance.navigation.type === 1) {
        hasPageReloaded.current = true;  
        sessionStorage.removeItem("weatherFetched"); 
      }

       const weatherFetched = sessionStorage.getItem("weatherFetched");
      if (!hasFetched.current && (!weatherFetched || hasPageReloaded.current)) {
        const fetchData = async () => {
          await fetchWeather();
          setLoading(false);
           sessionStorage.setItem("weatherFetched", "true");
          hasFetched.current = true; 
        };

        fetchData();
      } else {
        setLoading(false);  
      }
    }
  }, [fetchWeather]);

  // If loading, show loader
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
