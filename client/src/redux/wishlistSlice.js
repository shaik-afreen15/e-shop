import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsByUser: JSON.parse(localStorage.getItem("wishlist")) || {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const { userId, product } = action.payload;

      if (!state.itemsByUser[userId]) {
        state.itemsByUser[userId] = [];
      }

      const exists = state.itemsByUser[userId].find(
        (item) => item._id === product._id
      );

      if (exists) {
        state.itemsByUser[userId] = state.itemsByUser[userId].filter(
          (item) => item._id !== product._id
        );
      } else {
        state.itemsByUser[userId].push(product);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state.itemsByUser)
      );
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
