import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 p-5 flex justify-center items-center">
      <div className="relative w-24 h-24">
        <svg className="animate-rotate absolute top-0 left-0 right-0 bottom-0 m-auto w-full h-full" viewBox="25 25 50 50">
          <circle className="path stroke-white animate-dash animate-color" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
