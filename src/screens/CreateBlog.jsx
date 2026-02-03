import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../slices/blogSlice";
import { useCreateBlogMutation } from "../slices/blogsApiSlice";
import Header from "../components/Header";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../components/Loading";

const CreateBlogScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const token = userInfo?.token;

  const [create] = useCreateBlogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl;

      if (image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${image.name}`);
        const snapshot = await imageRef.put(image);
        imageUrl = await snapshot.ref.getDownloadURL();
      }

      const res = await create({
        title,
        body,
        category,
        tags,
        token,
        imageUrl,
      }).unwrap();

      dispatch(createBlog(res));
      toast.success("Blog created successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="create_form_container">
        <div className="form_content">
          <h2>Create Blog</h2>

          {isLoading && <Loading />}

          <form
            onSubmit={handleSubmit}
            className={isLoading ? "none" : "form"}
            encType="multipart/form-data"
          >
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
              <label>Body</label>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                placeholder="Enter Body"
              />
            </div>

            <div className="form_group">
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form_group">
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form_group">
              <label>Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={isLoading}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlogScreen;
