import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../redux/reducers/blogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [toggleDetail, setToggleDetail] = useState(false);

  const handleUpdateBlog = () => {
    dispatch(updateBlog(blog._id, { likes: blog.likes + 1 }));
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} ${blog.author}?`)) {
      dispatch(deleteBlog(blog._id));
    }
  };

  return (
    <div style={{ border: "1px solid black", maxWidth: "300px" }}>
      {blog.title} {blog.author}
      <button
        onClick={() => setToggleDetail(!toggleDetail)}
        data-testid="toggle-btn"
      >
        {toggleDetail ? "hide" : "view"}
      </button>
      {toggleDetail && (
        <div>
          <p>{blog.url}</p>
          <div style={{ display: "flex" }}>
            <p>likes {blog.likes}</p>
            <button onClick={handleUpdateBlog} data-testid="like-btn">
              like
            </button>
          </div>
          <p>{blog.user.name}</p>
          <button onClick={handleRemoveBlog} data-testid="remove-btn">
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
