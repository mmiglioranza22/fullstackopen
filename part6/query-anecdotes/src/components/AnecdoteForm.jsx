import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "./context/notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [_, dispatchNotification] = useContext(NotificationContext);

  const { mutate: createAnecdote } = useMutation({
    mutationFn: newAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["anecdotes"] }),
    onError: (errorResponse) => {
      dispatchNotification({
        type: "NEW_NOTIFICATION",
        payload: errorResponse.response.data.error,
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    createAnecdote(content);
    dispatchNotification({
      type: "NEW_NOTIFICATION",
      payload: `Anecdote created: ${content}`,
    });

    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
