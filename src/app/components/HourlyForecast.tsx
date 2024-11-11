import { useWeather } from "@/contexts/WeatherContext";
import React from "react";
import Msg from "./Msg";
 

const HourlyForecast: React.FC = () => {
  const { weather } = useWeather();

  if (!weather || !weather.hourforecast) {
    return <Msg/>;
  }

  return (
    <div className="bg-gray-500 text-white py-[20px] px-[15px] sm:px-[30px] sm:rounded-[30px] res-rounded-bottom shadow-customx-dar w-[100%] lg:w-[55%] xl:w-[65%]">
      <h2 className="text-[1.3rem] font-bold mb-6 text-center">
        Hourly Forecast :
      </h2>
      <div className="flex gap-[20px]  max-h-[350px] overflow-x-auto pb-[10px] ">
        {weather.hourforecast.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col gap-[4px] items-center bg-gray-700 rounded-[30px] w-[150px] p-[20px] flex-shrink-0"
          >
            <span className="text-xl font-bold mb-[4px]">{hour.time}</span>
            <img src={`./weathericons/${hour.code}.png`} alt="Weather icon" />
            <span className="text-xl">{hour.temp}°C</span>
            <img src="./navigation.png" alt="Wind icon" />
            <span className="text-xl font-semibold">{hour.wind_spd}km/h</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
