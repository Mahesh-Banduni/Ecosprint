import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setProfileData, setError, setLoading } from '../store/profileSlice';

export const useProfile = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.profile);
  
    const fetchProfile = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/users/details`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setProfileData(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const updateProfile = async (name,email,phone) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/users/update`, 
          { name, email, phone}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        dispatch(setProfileData(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error adding item'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    return {
      items,
      total,
      loading,
      error,
      fetchProfile,
      updateProfile
    };
  };
  
  export default useProfile;