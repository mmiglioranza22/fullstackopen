import { render, screen } from "@testing-library/react";
import { expect, describe, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

import { Provider } from "react-redux";

//https://medium.com/@vitalismutwiri/an-interactive-guide-to-integration-testing-of-redux-with-testing-library-1c22849792ab
// https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react-redux/
describe("<LoginForm />", () => {
  test("debug", () => {});

  // test("renders form and inserts values for username and password correctly", async () => {
  //   // GIVEN
  //   const formInput = {
  //     username: "username1",
  //     password: "password1",
  //   };
  //   const mockFn = vi.fn();
  //   const user = userEvent.setup();
  //   render(<LoginForm handleBlogService={mockFn} />);
  //   // WHEN
  //   const userInput = screen.getByTestId("username-input");
  //   const passwordInput = screen.getByTestId("password-input");
  //   const submitBtn = screen.getByTestId("button-submit");
  //   await user.type(userInput, formInput.username);
  //   await user.type(passwordInput, formInput.password);
  //   await user.click(submitBtn);
  //   // EXPECT
  //   expect(userInput).toBeDefined();
  //   expect(passwordInput).toBeDefined();
  //   expect(mockFn).toBeCalledTimes(1);
  //   expect(mockFn.mock.calls[0][0].username).toEqual(formInput.username);
  //   expect(mockFn.mock.calls[0][0].password).toEqual(formInput.password);
  // });
});
