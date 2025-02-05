import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setError, setLoading } from '../store/productSlice';
import axiosInstance from "../utils/axiosInstance";

export const useProducts = () => {
  const dispatch = useDispatch();

  const fetchProducts = async (filters = {}) => {
    try {
      dispatch(setLoading(true));
      
      // Prepare the filter payload
      const payload = {
        ...filters,
        // Ensure price range is correctly formatted
        priceRange: filters.priceRange 
          ? { 
              min: filters.priceRange[0], 
              max: filters.priceRange[1] 
            } 
          : undefined
      };

      // Remove empty arrays from filters
      Object.keys(payload).forEach(key => {
        if (Array.isArray(payload[key]) && payload[key].length === 0) {
          delete payload[key];
        }
      });

      const response = await axiosInstance.get('/search/products', payload);
      console.log(payload);
      console.log(response);
      
      // Dispatch the products
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(setError(error.message || 'An error occurred while fetching products'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { fetchProducts };
};