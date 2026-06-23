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
    decreaseStock(state, action) { // action.payload = [{ productId, quantity }, ...]
      action.payload.forEach(({ productId, quantity }) => {
      const product = state.items.find((p) => p.id === productId);
      if (product) {
        product.stock = Math.max(0, product.stock - quantity);
      }});
    },
  },
});

export const { setProducts, decreaseStock } = productsSlice.actions;
export const selectProducts = (state) => state.products.items;
export const selectProductById = (id) => (state) =>
  state.products.items.find((p) => p.id === Number(id));
export default productsSlice.reducer;