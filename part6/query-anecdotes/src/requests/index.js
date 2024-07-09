import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const newAnecdote = (anecdote) =>
  axios.post(baseUrl, { content: anecdote, votes: 0 }).then((res) => res.data);

export const voteAnecdote = (anecdote) =>
  axios.patch(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data);
