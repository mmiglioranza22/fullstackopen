import { Link, useParams } from "react-router-dom";

const UserDetail = ({ users }) => {
  let { userId } = useParams();
  if (!users) {
    return null;
  }
  const user = users.find((user) => user.id === userId);

  return (
    <>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDetail;
