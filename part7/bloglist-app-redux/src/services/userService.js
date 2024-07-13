import axios from "axios";
const baseUrl = "/api/login";

const login = async (payload) => {
  const request = await axios.post(baseUrl, payload);
  return request.data;
};

const getAll = async (payload) => {
  const request = await axios.get("/api/users", payload);
  return request.data;
};

export default { login, getAll };
