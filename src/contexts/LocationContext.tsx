'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

 interface Location {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: Location | null;
  getLocation: () => Promise<Location | null>;
}

// Creating the context
const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<Location | null>(null);

  const getLocation = (): Promise<Location | null> => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { latitude, longitude };
            setLocation(newLocation);
            resolve(newLocation);  
          },
          (error: GeolocationPositionError) => {
            console.error('Error getting location:', error);
            reject(error);  
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject('Geolocation is not supported by this browser.');
      }
    });
  };

  return (
    <LocationContext.Provider value={{ location, getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

 export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
