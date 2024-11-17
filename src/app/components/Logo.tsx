import React from 'react'
import { FaTemperatureThreeQuarters } from 'react-icons/fa6'

function Logo() {
  return (
    <div className='mds:flex none font-bold items-end w-full sm:w-[200px]'>
      <FaTemperatureThreeQuarters className='text-[2rem] lg:text-[2.5rem] xl:text-[3rem]' />
      <span className='text-[1.2rem] lg:text-[1.5rem] xl:text-[2rem] text-white'>
        Forecastly
      </span>
    </div>
  )
}

export default Logo
