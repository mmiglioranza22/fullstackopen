import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

// https://stackoverflow.com/questions/67240984/how-to-update-an-object-using-axios-and-json-server-in-a-react-hooks-project
const voteAnecdote = async (anecdote) => {
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, anecdote);
  return response.data;
};

export default { getAll, createNew, voteAnecdote };
