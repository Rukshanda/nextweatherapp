'use client'

import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import { LocationProvider } from "@/contexts/LocationContext";

import { WeatherProvider } from "@/contexts/WeatherContext";

import Loader from './components/Loader';
import Body from './components/Body';

export default function Home() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log("Home component loading...");
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); 
        console.log("Finished loading in Home");
        setLoading(false);  
      } catch (error) {
        console.error('Error loading data', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader/>
       
      </div>
    );
  }

  return (
    <LocationProvider>
      <WeatherProvider>
        <div className="font-poppins">
          <Navbar />
        <Body/>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
}
