import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

const initialState = {
  blogs: [],
  blog: {},
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk("blogs/fetch", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

// const addBlog = createAsyncThunk("blogs/add", (blog) => {});

// const removeBlog = createAsyncThunk("blogs/remove", (id) => {});

// const updateBlog = createAsyncThunk("blogs/update", (id, data) => {});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    // addBlog: (state, action) => {
    //   state.blogs.push(action.payload);
    // },
    // removeBlog: (state, action) => {
    //   state.blogs.splice(state.blogs.findIndex((i) => i.id === action.payload));
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.blog = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default blogSlice.reducer;
