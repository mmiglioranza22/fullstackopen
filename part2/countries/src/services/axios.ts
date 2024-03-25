import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
const getCountry = (search) => {
  return axios
    .get(`${baseUrl}/name/${search}`)
    .then((response) => response.data);
};
// const create = (newObject) => {
//   return axios.post(baseUrl, newObject).then((response) => response.data);
// };

// const update = (id, newObject) => {
//   return axios
//     .put(`${baseUrl}/${id}`, newObject)
//     .then((response) => response.data);
// };

// const deletePerson = (id) => {
//   return axios
//     .delete(`${baseUrl}/${id}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.log(error);
//       return error.response.data;
//     });
// };

export default {
  getAll,
  getCountry,
  // create,
  // update,
  // deletePerson,
};
