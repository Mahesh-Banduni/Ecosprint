import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name:'',
    email:'',
    phone:'',
    loading: false,
    error: null
  },
  reducers: {
    setProfileData: (state, action) => {
      const profileData = action.payload.data;
      state.profile = profileData.name;
      state.email=profileData.email;
      state.phone=profileData.phone;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProfileData, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;