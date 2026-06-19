import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { productId, name, price, quantity}
    locked: false, // true после оформления заказа
  },
  reducers: {
    addToCart(state, action) {
      if (state.locked) return;
      const { productId, name, price, stock } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        if (existing.quantity < stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({ productId, name, price, quantity: 1, stock });
      }
    },
    incrementItem(state, action) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },
    decrementItem(state, action) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.productId !== action.payload);
        }
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    lockCart(state) {
      state.locked = true;
    },
    unlockCart(state) {
      state.locked = false;
    },
  },
});

export const {
  addToCart, incrementItem, decrementItem,
  removeFromCart, clearCart, lockCart, unlockCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLocked = (state) => state.cart.locked;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectItemInCart = (productId) => (state) =>
  state.cart.items.find((i) => i.productId === productId);

export default cartSlice.reducer;