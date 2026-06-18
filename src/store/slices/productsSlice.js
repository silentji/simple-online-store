import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: productsData,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export const selectProducts = (state) => state.products.items;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === Number(id));
export default productsSlice.reducer;