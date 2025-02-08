import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

// If you have more reducers, add them here
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer
    // Add other reducers as you create them
    // e.g., 
    // cart: cartReducer,
    // user: userReducer
  },
});

export default store;
