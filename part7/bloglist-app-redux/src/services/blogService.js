import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(`${baseUrl}/all`, config);
  return request.then((response) => response.data);
};

const create = (payload) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, payload, config);
  return request.then((response) => response.data);
};

const update = (blogId, payload, comment = false) => {
  const config = {
    headers: { Authorization: token },
  };
  let request;
  if (comment) {
    request = axios.post(`${baseUrl}/${blogId}/comments`, payload, config);
  } else {
    request = axios.patch(`${baseUrl}/${blogId}`, payload, config);
  }
  return request.then((response) => response.data);
};

const remove = (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blogId}`, config);
  return request.then((response) => response.data);
};

export default { getAll, setToken, create, update, remove };
