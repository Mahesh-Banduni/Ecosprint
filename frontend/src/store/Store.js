import { configureStore } from '@reduxjs/toolkit';
import reducer from './productSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    products: reducer,
    // Add other reducers as you create them
    // e.g., 
    // cart: cartReducer,
    // user: userReducer
  },
});

export default store;
