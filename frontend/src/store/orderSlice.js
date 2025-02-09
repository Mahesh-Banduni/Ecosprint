import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    items: [],
    orderCode:'',
    totalAmount: 0,
    addressId:'',
    orderId:'',
    paymentStatus: '',
    orderStatus:'',
    orderDate:'',
    deliveryByDate:'',
    loading: false,
    error: null
  },
  reducers: {
    setOrderItems: (state, action) => {
      const orderData = action.payload.data;
      state.items = orderData.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.productName,
        price: item.productId.price,
        size: item.productId.size,
        image: item.productId.images[0],
        quantity: item.quantity,
        amount: item.amount
      }));
      state.orderId=orderData._id;
      state.totalAmount=orderData.totalAmount;
      state.paymentStatus=orderData.paymentStatus;
      state.orderStatus=orderData.orderStatus;
      state.orderDate=orderData.createdAt;
      state.deliveryByDate=orderData.deliveryByDate;
      state.orderCode=orderData.orderCode;
      state.addressId=orderData.addressId;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setOrderItems, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;