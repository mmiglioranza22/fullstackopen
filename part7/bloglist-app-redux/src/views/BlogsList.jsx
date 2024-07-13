import Blog from "../components/Blog";

const BlogsList = ({ blogs }) => {
  return blogs && blogs.length > 0 ? (
    blogs.map((blog, i) => <Blog key={blog.id + "-" + i} blog={blog} />)
  ) : (
    <p>No blogs</p>
  );
};

export default BlogsList;
