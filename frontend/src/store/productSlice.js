import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], // This should now be an empty array initially
  filters: {
    category: [],
    gender: [],
    brand: [],
    material: [],
    color: [],
    occasion: [],
    season: [],
    priceRange: { min: 0, max: 0 },
    sortBy: 'newest'
  },
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      // Assuming the response has a data property with the products array
      state.products = action.payload.data || [];
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setProducts, setFilters, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;