'use client'

import Navbar from "./components/Navbar";
import { LocationProvider } from "@/contexts/LocationContext";
import CountryDetails from "./components/CountryDetails";
import WeatherDetails from "./components/WeatherDetails";
import DailyForecast from "./components/DailyForecast";
import { WeatherProvider } from "@/contexts/WeatherContext";
import HourlyForecast from "./components/HourlyForecast";

export default function Home() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <div className="font-poppins">
          <Navbar />
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
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
}
