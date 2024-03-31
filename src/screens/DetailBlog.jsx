import { useSelector, useDispatch } from 'react-redux';
import Header from "../components/Header";
import { deleteBlog, loadBlog } from "../slices/blogSlice";
import { useGetBlogByIdQuery } from "../slices/blogsApiSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import { toast } from "react-toastify";
import { useDeleteBlogMutation } from '../slices/blogsApiSlice';

const DetailBlog = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [author, setAuthor] = useState(false)
  const {id} = useParams();
const token = userInfo?.token;

  const { 
      data:blogs,
      isLoading, 
      isError,
      error, 
      refetch 
  } = useGetBlogByIdQuery(id );

  const [deleteBlogApi] = useDeleteBlogMutation();

  useEffect(() => {
    if (!blogs) {
      console.log("no products found");
    }
  }, [blogs]);

  useEffect(() => {
    if (userInfo && userInfo._id === blogs?.user) {
        setAuthor(true); // Log author inside useEffect
    }
 // Log author inside useEffect
}, [blogs, userInfo, author]); 

  const handleDelete = async (blogId) => {
    try {
      console.log(blogId)
      await deleteBlogApi({ blogId: blogId, token: { token } });
      dispatch(deleteBlog({ blogId: blogId }));
      toast.success("Blog deleted successfully");
      navigate('/'); // Manually refetch products after deletion
    } catch (err) {
      console.error("Failed to delete product:", err);
      // Handle error if needed
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  let Date = ""; 
  if (blogs) {
    const CreatedAt = blogs.createdAt;
    const index = CreatedAt.indexOf("T");
    Date = CreatedAt.slice(0, index );
  }

  return (
    <>
      <Header />
      <div className='detail_container'> 
        <div className='detail_content'>
          <h1>{blogs?.title}</h1>
          <div className='blog_header'>
            <div className='blog_header_left'>    
              <p className='date'> {Date}</p>
              <p className='category'>{blogs?.category}</p>
            </div>
            {blogs && author &&
              <div className='author_button'>
                <Link to={`/editblog/${blogs._id}`} className='edit'>Edit</Link>
                <button className='delete' onClick={() => handleDelete(blogs._id)} >Delete</button>
              </div>}
          </div>
          <img src={blogs?.images} alt={blogs?.title} className="detail_image" />
          <p className='blog_body'  dangerouslySetInnerHTML={{ __html: blogs?.body }}></p>
          <p className='blog_tags'><span>Tags </span>:{blogs?.tags}</p>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;
