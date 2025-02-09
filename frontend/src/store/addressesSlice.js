import { createSlice } from '@reduxjs/toolkit';

const addressesSlice = createSlice({
  name: 'addresses',
  initialState: {
    address: [],
    total: 0,
    loading: false,
    error: null
  },
  reducers: {
    setAddresses: (state, action) => {
      const addressesData = action.payload.data;
      state.address = addressesData.address.map(item => ({
        addressId: item._id,
        pincode: item.pincode,
        flatHouseBuildingCompanyApartment: item.flatHouseBuildingCompanyApartment,
        areaStreetSectorVillage: item.areaStreetSectorVillage,
        landmark: item.landmark,
        townCity: item.townCity,
        state: item.state
      }));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setAddresses, setLoading, setError } = addressesSlice.actions;
export default addressesSlice.reducer;