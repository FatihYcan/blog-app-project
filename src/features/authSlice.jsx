import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "", // currentUser
  username: "",
  userId: "",
  token: "",
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user?.username;
      state.userId = payload?.user?._id;
      state.token = payload?.token;
      state.username = payload?.user?.username;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload?.data?.username;
      state.userId = payload?.data?.id;
      state.token = payload?.token;
      state.username = payload?.data?.username;
    },

    logoutSuccess: (state) => {
      state.user = "";
      state.loading = false;
      state.token = "";
      state.username = "";
      state.userId = "";
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions;

export default authSlice.reducer;
