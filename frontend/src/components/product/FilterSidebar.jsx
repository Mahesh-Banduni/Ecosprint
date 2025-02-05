import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, Filter, X, ChevronUp } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { setFilters } from '../../store/productSlice';
import PriceRangeSlider from './PriceRangeSlider';

const FilterSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { fetchProducts } = useProducts();
  const currentFilters = useSelector(state => state.products.filters);
  const [localFilters, setLocalFilters] = useState({
    category: [],
    gender: [],
    brand: [],
    material: [],
    color: [],
    occasion: [],
    season: [],
    priceRange: [0, 10000]
  });

  // Expanded sections state
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    brand: true,
    material: true,
    color: true,
    occasion: true,
    season: true,
    price: true
  });

  // Filter categories (same as before)
  const filterCategories = {
    category: ['Sneakers', 'Loafers', 'Oxford', 'Slip-ons', 'Boots', 'Sandals'],
    gender: ['Men', 'Women', 'Kids', 'Unisex'],
    brand: ['Nike', 'Adidas', 'Puma', 'Reebok', 'Vans'],
    material: ['Leather', 'Canvas', 'Mesh', 'Suede', 'Synthetic'],
    color: ['Black', 'Brown', 'White', 'Blue', 'Red', 'Green'],
    occasion: ['Casual', 'Formal', 'Sports', 'Party', 'Beach'],
    season: ['Summer', 'Winter', 'Monsoon', 'All Season']
  };

  // Toggle section expand
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle checkbox filter change
  const handleFilterChange = (category, value) => {
    const currentFilterList = localFilters[category] || [];
    const newFilterList = currentFilterList.includes(value)
      ? currentFilterList.filter(item => item !== value)
      : [...currentFilterList, value];

    const updatedFilters = {
      ...localFilters,
      [category]: newFilterList
    };

    setLocalFilters(updatedFilters);
  };

  // Handle price range change
  const handlePriceChange = (value) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    dispatch(setFilters(localFilters));
    fetchProducts(localFilters);
    onClose();
  };

  // Reset all filters
  const resetFilters = () => {
    const resetState = {
      category: [],
      gender: [],
      brand: [],
      material: [],
      color: [],
      occasion: [],
      season: [],
      priceRange: [0, 10000]
    };

    setLocalFilters(resetState);
    dispatch(setFilters(resetState));
    fetchProducts(resetState);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity sm:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 -z-10'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`
        fixed sm:sticky sm:top-20 top-0 right-0 h-full w-64 bg-white 
        sm:w-auto sm:h-[calc(100vh-5rem)] sm:max-w-xs
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        sm:translate-x-0 
        transition-transform duration-300 ease-in-out
        overflow-y-auto z-50 p-4 shadow-lg
        sm:col-span-3 lg:col-span-2
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
      `}>
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <h2 className="text-xl font-bold">Filters</h2>
          <button 
            onClick={onClose} 
            className="sm:hidden p-2 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Price Range Slider */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection('price')}
          >
            <h3 className="text-lg font-semibold">Price Range</h3>
            {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {expandedSections.price && (
            <div className="mt-4">
              <PriceRangeSlider
                min={0}
                max={10000}
                step={100}
                value={localFilters.priceRange}
                onChange={handlePriceChange}
              />
            </div>
          )}
        </div>

        {/* Filter categories */}
        {Object.entries(filterCategories).map(([category, options]) => (
          <div key={category} className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(category)}
            >
              <h3 className="text-lg font-semibold capitalize">{category}</h3>
              {expandedSections[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            {expandedSections[category] && (
              <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                {options.map(option => (
                  <label 
                    key={option} 
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      checked={localFilters[category].includes(option)}
                      onChange={() => handleFilterChange(category, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Filter Action Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={applyFilters}
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;