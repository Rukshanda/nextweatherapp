"use client";

import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import LocationBtn from "./LocationBtn";
import { useWeather } from "@/contexts/WeatherContext";
import Logo from "./Logo";

const Navbar: FC = () => {
  const [city_name, setCityName] = useState<string>("");

  const { fetchWeather } = useWeather();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  const handleFetchWeather = () => {
    if (!city_name) {
      console.error("City name is required.");
      return;
    }
    fetchWeather(city_name);
    setCityName('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetchWeather();
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-[1600px] w-full flex justify-center">
        <div className="py-[2rem] px-[10px] lg:px-[1rem] xl:px-[2rem] flex gap-[20px] md:gap-[30px] lg:gap-[80px] flex-row items-center w-full justify-center">
          <Logo />

          {/* Search button */}
          <div className="bg-gray-500 flex gap-3 items-center p-[10px] lg:p-3 w-full sm:w-[800px] rounded-full shadow-custom-dark">
            <span className="text-lg pl-3" onClick={handleFetchWeather}>
              <FaSearch className="text-white" />
            </span>
            <input
              type="text"
              placeholder="Search City"
              aria-label="Search city"
              className="bg-gray-500 placeholder-white appearance-none outline-none text-white w-full text-[1rem] md:text-[1.1rem] lg:text-[1.2rem]"
              value={city_name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Current Location */}
          <LocationBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
