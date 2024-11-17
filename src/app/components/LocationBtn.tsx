"use client";

import { useLocation } from "@/contexts/LocationContext";
import { useWeather } from "@/contexts/WeatherContext";
import React from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";

function LocationBtn() {
  const { getLocation } = useLocation();
  const { fetchWeather } = useWeather();
  
  const handleClick = () => {
     getLocation().then((location) => {
      if (location && location.latitude && location.longitude) {
        fetchWeather("", location.latitude, location.longitude);  
        console.log(location.latitude , location.longitude)
      } else {
        console.error("Failed to retrieve location");
      }
    }).catch((error) => {
      console.error("Error fetching location:", error);
    });
  };

  return (
    <button
      className="bg-slate-700 p-[12px] flex items-center rounded-[30px] justify-center w-[55px] h-[50px] mds:w-[250px] mds:h-[100%] shadow-custom-dark gap-[8px] text-white"
      onClick={handleClick}
    >
      <span className="text-[1.8rem] mds:text-[1.4rem] lg:text-[1.6rem]">
        <FaLocationCrosshairs />
      </span>
      <span className="mds:inline none text-[14px] lg:text-[15.5px]  xl:text-[1.2rem] font-bold ">Your Location</span>
    </button>
  );
}

export default LocationBtn;
