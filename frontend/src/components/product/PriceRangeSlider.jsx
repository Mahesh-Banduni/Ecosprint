import React, { useState } from 'react';

const PriceRangeSlider = ({ 
  min = 0, 
  max = 10000, 
  step = 100, 
  value, 
  onChange 
}) => {
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), value[1] - step);
    onChange([newMin, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), value[0] + step);
    onChange([value[0], newMax]);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute h-2 bg-emerald-700 rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`
          }}
        />
      </div>
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            value={value[0]}
            onChange={handleMinChange}
            min={min}
            max={value[1] - step}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            value={value[1]}
            onChange={handleMaxChange}
            min={value[0] + step}
            max={max}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;