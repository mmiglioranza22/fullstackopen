import axios from "axios";
const baseUrl = "/api/login";

const login = async (payload) => {
  const request = await axios.post(baseUrl, payload);
  return request.data;
};

export default { login };
