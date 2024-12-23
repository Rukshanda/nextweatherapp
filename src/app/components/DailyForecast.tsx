import { useWeather } from "@/contexts/WeatherContext";

const DailyForecast: React.FC = () => {
  const { weather } = useWeather();

  return (
    <div className="bg-gray-500 text-white py-[20px] px-[15px] sm:px-[30px] sm:rounded-[30px] res-rounded-top shadow-customx-dark w-[100%] lg:w-[35%] xl:w-[25%]">
      <h2 className="text-[1.3rem] text-center font-bold mb-4">
        16 Days Forecast:
      </h2>

      <div className="space-y-4 max-h-[350px] pr-[20px] overflow-y-auto">
        {weather?.forecast?.map((item, index) => (
          <div key={item.date || index} className="flex items-center justify-between">
            <img src={`./weathericons/${item.code}.png`} alt={`Weather icon for ${item.date}`} />
            <span className="text-xl font-bold">{item.temp_max}°C</span>
            <span className="font-semibold">{item.date}</span>
          </div>
        )) || <p>No forecast available</p>}
      </div>
    </div>
  );
};

export default DailyForecast;
