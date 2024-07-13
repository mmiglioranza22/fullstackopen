import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
  if (!users) return null;
  return (
    <>
      <h1>Users</h1>
      <table style={{ width: "300px", textAlign: "start" }}>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" style={{ textAlign: "start" }}>
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
