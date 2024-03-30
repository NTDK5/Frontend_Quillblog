import { useGetBlogsQuery } from "../slices/blogsApiSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { loadBlog } from "../slices/blogSlice";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import Loading from '../components/Loading'
import { FaSearch } from "react-icons/fa";


const HomeScreen = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] =useState(false)
    const [blogsList, setBlogsList] = useState();
    const token = userInfo?.token;

    const { 
        data:blogs,
        isLoading, 
        isError,
        error, 
        refetch 
    } =
    useGetBlogsQuery({token});
    useEffect(()=>{
        if(blogs){
        dispatch(loadBlog(blogs))
        }
        else{
            console.log("no products found");
        }
        refetch()
    },[blogs, dispatch, refetch])

    // const handleChange = (event) => {
    //   setSearchTerm(event.target.value);
    // };
    const handleChange = (e)=>{
      const value = e.target.value;
      setSearchTerm(value);
      setSearch(true)
      if (value === "") {
        // If searchTerm is empty, reset blogsList to show all blogs
        setBlogsList(blogs);
    } else {
        // Filter blogsList based on searchTerm
        const filteredBlogs = blogs.filter(blog => blog.tags.includes(value));
        setBlogsList(filteredBlogs);
    }
    }

    if (isLoading) {
        return <Loading />;
      }
    
      if (isError) {
        return <div>Error: {error}</div>;
      }
  return (
    <>
    <Header />
    <div className="blog_container">
    <div className="search-form">
      <input
        type="search"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={()=>{}} className="search-button">
        <FaSearch />
      </button>
    </div>
        <div className="blog_list">
        {search ? (blogsList && blogsList?.map((blog) => <Link to={`/blog/${blog._id}`}><BlogCard key={blog.id} blog={blog} /></Link>)) : (blogs && blogs?.map((blog) => <Link to={`/blog/${blog._id}`}><BlogCard key={blog.id} blog={blog} /></Link>))}
        </div>
    </div>
    </>
  )
}

export default HomeScreen

