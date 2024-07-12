import { useState } from "react";
import { useDispatch } from "react-redux";
import { postBlog } from "../redux/reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });

  const handleCreateBlog = (ev) => {
    setNewBlog((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postBlog(newBlog));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" name="title">
          title
        </label>
        <input
          onChange={handleCreateBlog}
          name="title"
          data-testid="title-input"
        />
      </div>
      <div>
        <label htmlFor="author" name="author">
          author
        </label>
        <input
          onChange={handleCreateBlog}
          name="author"
          data-testid="author-input"
        />
      </div>
      <div>
        <label htmlFor="url" name="url">
          url
        </label>
        <input onChange={handleCreateBlog} name="url" data-testid="url-input" />
      </div>
      <button type="submit" data-testid="submit-blog">
        create
      </button>
    </form>
  );
};

export default BlogForm;
