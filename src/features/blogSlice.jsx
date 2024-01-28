import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    categories: [],
    blogs: [],
    // comments: [],
    likes: [],
    user: [], //MyUser
    details: {},
    loading: false,
    error: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.error = false;
      state.loading = true;
    },

    // getBlogSuccess: (state, { payload: { data, url } }) => {
    //   state[url] = data;
    //   state.loading = false;
    //   state.error = false;
    // },

    getBlogSuccess: (state, action) => {
      state[action.payload.url] = action.payload.apiData;
      state.loading = false;
      state.error = false;
    },

    getCategorySuccess: (state, { payload: { data, url } }) => {
      state[url] = data;
      state.loading = false;
      state.error = false;
    },

    getDetailSuccess: (state, { payload }) => {
      state.details = payload.apiData;
      state.loading = false;
      state.error = false;
    },

    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getBlogSuccess,
  getCategorySuccess,
  getDetailSuccess,
  getUserSuccess,
  fetchFail,
} = blogSlice.actions;

export default blogSlice.reducer;
