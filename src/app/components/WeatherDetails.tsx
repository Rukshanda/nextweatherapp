import { useWeather } from "@/contexts/WeatherContext";
import React from "react";
 
function WeatherDetails() {
  const { weather } = useWeather();

 
  return (
    <div className="grid grid-cols-1 xl:flex gap-[25px] sm:gap-[15px] w-[100%] lg:w-[60%] bg-gray-500 sm:rounded-[30px] res-rounded-bottom text-white shadow-customx-dark px-[15px] md:px-[30px] py-[25px] sm:py-[15px] items-center">
      {/* -------------------------------------- */}
      <div className="flex xl:flex-col flex-col xsm:flex-row gap-[20px] xsm:gap-[10px] xl:justify-normal justify-between w-[100%] xl:w-[18rem] items-center ">
        <div className="flex flex-col items-center">
          <p className="text-[2.3rem] md:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.8rem] font-extrabold">
            {weather?.temp}°C
          </p>
          <p className="text-[1rem] md:text-[1.2rem]">
            Feels Like:
            <span className="text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold">
              {weather?.app_temp}°C
            </span>
          </p>
        </div>
        <div className="flex flex-row xl:flex-col gap-[20px]">
          <div className="flex gap-[10px] items-center">
            <img src="./sunrise-dark.png" alt="" />
            <p className="flex flex-col">
              <span className="text-[1rem] lg:text-[1.1rem] font-semibold">
                Sunrise
              </span>
              <span className="text-[1rem] lg:text-[1.1rem] font-semibold">
                {weather?.sunrise}
              </span>
            </p>
          </div>
          <div className="flex gap-[10px] items-center">
            <img src="./sunset-dark.png" alt="" />
            <p className="flex flex-col">
              <span className="text-[1rem] lg:text-[1.1rem] font-semibold">
                Sunset
              </span>
              <span className="text-[1rem] lg:text-[1.1rem] font-semibold">
                {weather?.sunset}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* -------------------------------------- */}

      <div className="flex flex-col sm:flex-row xl:flex-col w-[100%] xl:w-[18rem] items-center xl:justify-center">
        <img
          src={`./weathericons/${weather?.code}@3x.png`}
          alt=""
          className="w-[180px] md:w-[250px]"
        />
        <span className="text-[2rem] lg:text-[2.2rem] font-bold">
          {weather?.description}
        </span>
      </div>

      {/* -------------------------------------- */}

      <div className="flex flex-wrap xsm:flex-nowrap xl:flex-wrap w-[100%] xl:w-[18rem] items-center gap-[30px] xsm:gap-[0px] xl:gap-[30px] ">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-[2px] items-center w-1/2">
            <img src="./humidity-dark.png" alt="Humidity icon" />
            <span>{weather?.rh}%</span>
            <span>Humidity</span>
          </div>
          <div className="flex flex-col gap-[2px] items-center w-1/2">
            <img src="./wind-dark.png" alt="Wind Speed icon" />
            <span>{weather?.wind_spd}km/h</span>
            <span>Wind Speed</span>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-[2px] items-center w-1/2">
            <img src="./pressure-dark.png" alt="Pressure icon" />
            <span>{weather?.pres}hPa</span>
            <span>Pressure</span>
          </div>
          <div className="flex flex-col gap-[2px] items-center w-1/2">
            <img src="./uv-dark.png" alt="UV icon" />
            <span>{weather?.uv}</span>
            <span>UV</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
