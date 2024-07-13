import axios from "axios";
const baseUrl = "/api/login";

const login = (payload) => {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get("/api/users");
  return request.then((response) => response.data);
};

export default { login, getAll };
