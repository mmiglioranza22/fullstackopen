import { render, screen } from "@testing-library/react";
import { expect, describe, vi, beforeEach } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { setupStore } from "../redux/store";
import { newBlog } from "../redux/reducers/blogReducer";
import { renderWithProviders } from "../utils/redux-test-utils";

/**
 * https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/#-how-to-perform-testing-with-the-react-redux-toolkit
 *
 * The test environments are working in their own world. They don't know if you wrap a provider somewhere in index.js and enable Redux logic.
 * So the tests are still trying to make the rendering work without Redux. But our application now depends on Redux to manage our main state.
 */

let store = null;
describe("<Blog />", () => {
  // test("debug", () => {});
  beforeEach(() => {
    const initialState = { blogs: [] };
    store = setupStore(initialState);
  });
  test("renders title and author but not url", () => {
    // GIVEN
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 1,
      user: {
        name: "tester",
      },
    };
    // WHEN
    store.dispatch(newBlog(blog));
    renderWithProviders(<Blog blog={blog} />, { store });

    // THEN
    const titleAuthor = screen.queryByText("test title test author");
    const url = screen.queryByText("test url");
    const likes = screen.queryByText("likes 1");

    expect(titleAuthor).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });
  test("shows url and likes if toggle button is clicked", async () => {
    // GIVEN
    const user = userEvent.setup();
    const blog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 1,
      user: {
        name: "tester",
      },
    };
    // WHEN
    store.dispatch(newBlog(blog));
    renderWithProviders(<Blog blog={blog} />);

    const toggleButton = screen.getByTestId("toggle-btn");
    await user.click(toggleButton);

    // THEN
    const url = screen.getByText("test url");
    const likes = screen.getByText("likes 1");
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
  });
  // test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  //   const blog = {
  //     title: "test title",
  //     author: "test author",
  //     url: "test url",
  //     likes: 1,
  //     user: {
  //       name: "tester",
  //     },
  //   };
  //   const mockFn = vi.fn();
  //   const user = userEvent.setup();

  //   // WHEN
  //   store.dispatch(newBlog(blog));
  //   renderWithProviders(<Blog blog={blog} />);

  //   const toggleButton = screen.getByTestId("toggle-btn");
  //   await user.click(toggleButton);
  //   const likeButton = screen.getByTestId("like-btn");
  //   await user.click(likeButton);
  //   await user.click(likeButton);

  //   expect(mockFn).toBeCalledTimes(2);
  // });
});
