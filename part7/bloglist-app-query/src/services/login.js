import axios from "axios";
const baseUrl = "/api/login";

const login = (payload) => {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
};

export default { login };
