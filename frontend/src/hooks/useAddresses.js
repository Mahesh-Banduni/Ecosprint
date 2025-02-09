import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setAddresses, setError, setLoading } from '../store/addressesSlice';

export const useAddresses = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const { addresses, total, loading, error } = useSelector(state => state.addresses);
  
    const fetchAddress = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get(`/users/addresses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setAddresses(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.response?.data || 'Error fetching cart'));
        dispatch(setLoading(false));
        throw error;
      }
    };
  
    const addAddress = async (pincode,flatHouseBuildingCompanyApartment,areaStreetSectorVillage,landmark,townCity, state) => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.post(
          `/address/add`, 
          { pincode, flatHouseBuildingCompanyApartment, phone, areaStreetSectorVillage,landmark,townCity, state}, 
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

    const updateAddress = async (addressId, pincode,flatHouseBuildingCompanyApartment,areaStreetSectorVillage,landmark,townCity, state) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.put(
            `/address/:${addressId}/update`, 
            { pincode, flatHouseBuildingCompanyApartment, phone, areaStreetSectorVillage,landmark,townCity, state}, 
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

      const deleteAddress = async (addressId) => {
        dispatch(setLoading(true));
        try {
          const response = await axiosInstance.delete(
            `/address/:${addressId}/delete`, 
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
      fetchAddress,
      addAddress,
      updateAddress,
      deleteAddress
    };
  };
  
  export default useAddresses;