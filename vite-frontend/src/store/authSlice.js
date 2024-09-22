import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  authStatus: false,
  profileStatus: false,
  userData: null,
  profileData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.userData = null;
    },
    loginProfile: (state, action) => {
      state.profileStatus = true;
      state.profileData = action.payload;
    },
    logoutProfile: (state) => {
      state.profileStatus = false;
      state.profileData = null;
    },
  },
});

export const { login, logout, loginProfile, logoutProfile } = authSlice.actions;
export default authSlice.reducer;
