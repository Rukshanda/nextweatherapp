import { useWeather } from "@/contexts/WeatherContext";
import React, { FC } from "react";
 
const CountryDetails: FC = () => {
   const { weather } = useWeather();

  
  return (
    <div className="bg-gray-500 sm:rounded-[30px] res-rounded-top text-white shadow-customx-dark w-[100%] lg:w-[30%] py-[60px] px-[20px] text-center flex flex-col justify-center xl:justify-between">
      <p className="text-[2rem] lg:text-[2rem] xl:text-[2.2rem] font-bold">
        {weather?.city_name}
      </p>

      <p className="flex flex-col">
        <span className="text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-extrabold">
          {weather?.currenttime}
        </span>
        <span className="text-[1.3rem] font-semibold">
          {weather?.day_name} {weather?.date}{" "}
        </span>
      </p>
    </div>
  );
};

export default CountryDetails;
