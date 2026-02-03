import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;

      const existingItem = state.products.find(
        (p) => p._id === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({
          id: item._id,
          title: item.title,
          price: Number(item.price),
          image: item.image || item.images?.[0],
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += Number(item.price);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const item = state.products.find((p) => p._id === _id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.products = state.products.filter((p) => p._id !== _id);
      }
    },

    increaseQuantity(state, action) {
      const item = state.products.find(
        (p) => p._id === action.payload
      );

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.products.find(
        (p) => p._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }
    },

    clearCart(state) {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
