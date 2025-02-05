import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown, Star, Filter } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { setFilters } from '../../store/productSlice';

// 1. Header Component with Sort
const ProductHeader = () => {
  const dispatch = useDispatch();
  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-sm ">
      <h1 className="text-2xl font-bold text-gray-800">Our Products</h1>
      <div className="mt-4 md:mt-0">
        <select 
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => dispatch(setFilters({ sortBy: e.target.value }))}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductHeader;