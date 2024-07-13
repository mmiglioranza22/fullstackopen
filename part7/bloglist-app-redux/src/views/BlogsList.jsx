import { Link } from "react-router-dom";
import Blog from "../components/Blog";

const BlogsList = ({ blogs }) => {
  if (!blogs) return null;
  return (
    <>
      <ul style={{ listStyleType: "none" }}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </li>
          ))
        ) : (
          <li>
            <p>No blogs</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default BlogsList;
