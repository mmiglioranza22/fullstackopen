import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogComment } from "../redux/reducers/blogReducer";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const handleCreateComment = (ev) => {
    setNewComment(ev.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      dispatch(
        updateBlogComment(blog._id, {
          comments: blog.comments.concat(newComment),
        }),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          onChange={handleCreateComment}
          name="comment"
          data-testid="comment-input"
        />
      </div>
      <button type="submit" data-testid="submit-blog">
        add comment
      </button>
    </form>
  );
};

export default CommentForm;
