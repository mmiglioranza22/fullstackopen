import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import userService from "../services/login";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", "users"] });
      console.log({ response });
    },
    onError: (errorResponse) => {
      dispatchNotification({
        type: "NEW_NOTIFICATION",
        payload: errorResponse.response.data.error,
      });
    },
  });
};

export const useVoteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      console.log({ response });
    },
    onError: (errorResponse) => {
      dispatchNotification({
        type: "NEW_NOTIFICATION",
        payload: errorResponse.response.data.error,
      });
    },
  });
};

export const useRemoveBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs", "users"] });
      console.log({ response });
    },
    onError: (errorResponse) => {
      dispatchNotification({
        type: "NEW_NOTIFICATION",
        payload: errorResponse.response.data.error,
      });
    },
  });
};

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: userService.login,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", "users"] });
      console.log({ response });
    },
    onError: (errorResponse) => {
      dispatchNotification({
        type: "NEW_NOTIFICATION",
        payload: errorResponse.response.data.error,
      });
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: userService.getAll,
  });
};
