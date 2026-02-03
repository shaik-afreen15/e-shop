import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    // role: null,
    isLoggedIn: false
  },
  reducers: {
    loginSuccess(state, action) {
      // state.user = action.payload; // { id, email }
      // state.role = action.payload.role;
       const user = {
        ...action.payload,
        role: action.payload.role.toUpperCase(), 
      };
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    logout(state) {
      state.user = null;
      // state.role = null;
      state.isLoggedIn = false;
      localStorage.removeItem("currentUser"); 
      localStorage.removeItem("token");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;  
export default authSlice.reducer;
