import { blogApi} from "./apiSlice";

const BLOGS_URL = "/api/blogs";

export const blogApiSlice = blogApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: "GET",
      }),
    }),
    getBlogById: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "GET",
      }),
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blogId, updatedBlog }) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation({
      query: ({ blogId, token }) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE",
        body: token,
      }),
    }),
    // deleteBlog: builder.mutation({  
    //   query: ({blogId, token}) => ({
    //     url: `${BLOGS_URL}/${blogId}`,
    //     method: "DELETE",
    //     body:token
    //   }),
    // }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApiSlice;
