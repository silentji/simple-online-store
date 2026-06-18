import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    lastConfirmationNumber: null,
  },
  reducers: {
    placeOrder(state, action) {
      const confirmationNumber = `ORD-${Date.now()}`;
      state.list.push({
        id: confirmationNumber,
        items: action.payload,
        placedAt: new Date().toISOString(),
      });
      state.lastConfirmationNumber = confirmationNumber;
    },
    clearConfirmation(state) {
      state.lastConfirmationNumber = null;
    },
  },
});

export const { placeOrder, clearConfirmation } = ordersSlice.actions;
export const selectOrders = (state) => state.orders.list;
export const selectLastConfirmation = (state) => state.orders.lastConfirmationNumber;
export default ordersSlice.reducer;