import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '../slices/blogsApiSlice';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import Header from '../components/Header';
import { editSelectedBlog, selectBlog } from '../slices/blogSlice';
import { Link, useParams } from "react-router-dom"; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const EditBlogScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [category, setCategory] = useState("");
const [tags, setTags] = useState("");
const [image, setImage] = useState(""); 
const [imageUrl, setImageUrl] = useState(null);
const { userInfo } = useSelector((state) => state.auth);
const token = userInfo?.token;


const [updateBlog, { isLoading: isUpdateLoading, isError: isUpdateError, error: updateError }] = useUpdateBlogMutation();


const { id } = useParams();
const { 
    data:blogs,
    isLoading, 
    isError,
    error, 
    refetch 
} =
useGetBlogByIdQuery(id );
console.log(id)

const blogId = blogs?._id;

useEffect(() => {
      setTitle(blogs?.title || "");
      setBody(blogs?.body || "");
      setTags(blogs?.tags || "");
      setCategory(blogs?.category || "");
      setImageUrl(blogs?.image || "");
      selectBlog({title, body, tags, category, imageUrl})
  }, [blogs]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      try {

        const snapshot = await imageRef.put(image);

        const downloadURL = await snapshot.ref.getDownloadURL();

        setImageUrl(downloadURL);
        try {
          const res = await updateBlog({blogId : blogId, updatedBlog :{ title, body, category, tags, token, imageuri :downloadURL}}).unwrap();
          dispatch(editSelectedBlog({ ...res }));
          navigate("/");
        toast.success('Blog Editted successfully')
        } catch (err) {
          console.error("Error creating blog:", err);
          toast.error("Failed to create blog. Please try again later.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again later.");
      }
    } else {
      console.log('No image selected');
      // Proceed with blog creation without image
      try {
        const res = await updateBlog({ blogId :blogId, updatedBlog: { title, body, category, tags, token, imageUrl }});
        dispatch(editSelectedBlog({ ...res }));
        navigate("/");
        toast.success('Blog Editted successfully')
      } catch (err) {
        console.error("Error creating blog:", err);
        toast.error("Failed to create blog. Please try again later.");
      }
    }
  };  
  

  const handleBodyChange = (html) => {
    setBody(html);
  };


  return (
    <>
      <Header />
      <div className="create_form_container">
        <div className="form_content">
          <h2>Create Blog</h2>
          <form onSubmit={isLoading ? null : handleSubmit} encType="multipart/form-data">
            <div className="form_group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
                required
              />
            </div>
            <div className="form_group">
            <label htmlFor="editor">Body</label>
             <ReactQuill
             placeholder="Enter Body"
             id="Body"
        theme="snow" // 'snow' is the default theme
        value={body}
        onChange={handleBodyChange}
      />
      </div>
            <div className="form_group">
              <label>Category</label>
              <input
                type="text"
                value={category}
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="form_group">
              <label>Image</label>
              <input
                type="file"
                title="image" 
                onChange={(e) => {const file = e.target.files[0];
              setImage(file);

              // setImage(file);
                }} 
              />
            </div>
            <div className="form_group">
              <label>tags</label>
              <input
                type="text"
                value={tags}
                placeholder="Enter tags"
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
            <button type="submit">Edit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditBlogScreen