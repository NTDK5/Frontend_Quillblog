import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Blogs: [],
  selectedBlog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    loadBlog: (state, action) => {
      state.Blogs = action.payload;
    },

    selectBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },

    editSelectedBlog: (state, action) => {
      const updatedBlog = action.payload;
      if (
        state.selectedBlog &&
        state.selectedBlog.id === updatedBlog.id
      ) {
        state.selectedBlog = { ...state.selectedBlog, ...updatedBlog };
        state.Blogs = state.Blogs.map((blog) =>
          blog.id === updatedBlog.id
            ? { ...blog, ...updatedBlog }
            : blog
        );
      }
    },

    createBlog: (state, action) => {
      const newBlog = action.payload;
      state.Blogs = [...state.Blogs, newBlog];
    },

    deleteBlog: (state, action) => {
      const blogId = action.payload;
      state.Blogs = state.Blogs.filter(
        (blog) => blog.id !== blogId
      );
      if (state.selectedBlog?.id === blogId) {
        state.selectedBlog = null;
      }
    },
  },
});

export const {
  loadBlog,
  selectBlog,
  editSelectedBlog,
  createBlog,
  deleteBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
