import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../slices/blogSlice"; 
import { useCreateBlogMutation } from "../slices/blogsApiSlice";
import Header from "../components/Header";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from "../components/Loading";

const CreateBlogScreen = () => {
  const [_isLoadings, setLoadings] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(""); 
  const [_imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;


  const [create, {_isLoading, isError, error  }] = useCreateBlogMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadings(true)
    if (image) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      try {

        const snapshot = await imageRef.put(image);

        const downloadURL = await snapshot.ref.getDownloadURL();

        setImageUrl(downloadURL);
        try {
          const res = await create({ title, body, category, tags, token, _imageUrl: downloadURL }).unwrap();
          dispatch(createBlog({ ...res }));
          toast.success('Blog Created successfully')
          navigate("/");
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
        const res = await create({ title, body, category, tags, token }).unwrap();
        dispatch(createBlog({ ...res }));
        console.log(body)
        console.log(res)
        navigate("/");
      } catch (err) {
        console.error("Error creating blog:", err);
        toast.error("Failed to create blog. Please try again later.");
      }
    }
    setLoadings(false)
  };
  const handleBodyChange = (html) => {
    setBody(html);
  };
  

  return (
    <><Header />
      <div className="create_form_container">
        <div className="form_content">
          <h2>Create Blog</h2>
          {isLoadings && <Loading />}
          <form onSubmit={isLoadings ? null : handleSubmit} className={isLoadings ? "none" : "form"} encType="multipart/form-data">
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
                required
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
            <button type="submit">Create</button>
          </form>
        </div>
      </div></>
  );
};

export default CreateBlogScreen;
