import { useParams } from "react-router-dom";
import Blog from "../components/Blog";

const BlogDetail = ({ blogs }) => {
  let { blogId } = useParams();
  if (!blogs) {
    return null;
  }
  const blog = blogs.find((blog) => blog._id === blogId);

  return <Blog blog={blog} />;
};

export default BlogDetail;
