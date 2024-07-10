import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "./context/notificationContext";

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const [notification, dispatchNotification] = useContext(NotificationContext);

  const {
    data: anecdotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const { mutate: vote } = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
  });

  const handleVote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    vote(votedAnecdote);
    dispatchNotification({
      type: "NEW_NOTIFICATION",
      payload: `Anecdote ${anecdote.content} voted`,
    });
  };

  return (
    <>
      {error && (
        <p>
          anecdote service not available due to problems in server:{" "}
          {error.message}
        </p>
      )}
      {isLoading && <p>Loading...</p>}
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
