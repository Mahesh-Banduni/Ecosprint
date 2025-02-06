import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ProductHeader = ({ dispatch, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Sort By' });
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: '', label: 'Sort By' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    dispatch(setFilters({ sortBy: option.value }));
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Our Products</h1>
        
        <div className="relative w-full sm:w-48" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
          >
            <span className="text-gray-700">{selectedOption.label}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <ul className="py-1">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => handleSelect(option)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        selectedOption.value === option.value
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;