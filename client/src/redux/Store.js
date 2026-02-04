import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import searchReducer from "./SearchSlice"
import wishlistReducer from "./wishlistSlice";
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    search: searchReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});  

export default store;                                                           