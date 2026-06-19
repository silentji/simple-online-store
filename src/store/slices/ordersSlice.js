import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
  },
  reducers: {
    placeOrder(state, action) {
      const confirmationNumber = `ORD-${Date.now()}`;
      state.list.push({
        id: confirmationNumber,
        items: action.payload.items,
        total: action.payload.total,
        placedAt: new Date().toISOString(),
        status: 'Принят',
      });
    },
  },
});

export const { placeOrder } = ordersSlice.actions;
export const selectOrders = (state) => state.orders.list;
export default ordersSlice.reducer;