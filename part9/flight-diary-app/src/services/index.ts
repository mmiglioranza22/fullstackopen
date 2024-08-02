import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewDiaryEntry } from "../types";

const getAll = async () => {
  const { data } = await axios.get(`${apiBaseUrl}/diaries`);
  return data;
};

const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post(`${apiBaseUrl}/diaries`, object);

  return data;
};

export default {
  getAll,
  create,
};
