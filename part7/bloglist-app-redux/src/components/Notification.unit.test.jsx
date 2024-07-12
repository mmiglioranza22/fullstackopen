import { render, screen } from "@testing-library/react";
import { expect, describe } from "vitest";
import Notification from "./Notification";
import { setupStore } from "../redux/store";
import { setNotification } from "../redux/reducers/notificationReducer";
import { renderWithProviders } from "../utils/redux-test-utils";

// let store = null;
describe("<Notification />", () => {
  test("debug", () => {});
  // beforeEach(() => {
  //   const initialState = null;
  //   store = setupStore(initialState);
  // });
  // test("renders nothing if message is null", () => {
  //   // GIVEN
  //   const message = null;
  //   // WHEN
  //   // WHEN
  //   store.dispatch(setNotification(message));
  //   const { container } = renderWithProviders(<Notification />, { store });
  //   screen.debug();
  //   // = render(<Notification />);
  //   // EXPECT
  //   expect(container).toBeEmptyDOMElement();
  // });
  // test("shows error styles and message when error is present", async () => {
  //   const message = {
  //     error: "ERROR MESSAGE",
  //     message: "ERROR MESSAGE",
  //   };
  //   render(<Notification message={message} />);
  //   const notification = screen.getByTestId("notification");
  //   const errorMessage = screen.getByText(message.error);
  //   expect(notification).toHaveStyle("border: 5px solid red");
  //   // colors are set via rgb
  //   expect(notification).toHaveStyle("color: rgb(255, 0, 0)");
  //   expect(errorMessage).toBeDefined();
  // });
  // test("shows success styles and message when no error is present", async () => {
  //   const message = {
  //     message: "NEW BLOG ADDED",
  //   };
  //   render(<Notification message={message} />);
  //   const notification = screen.getByTestId("notification");
  //   const messageMessage = screen.getByText(message.message);
  //   expect(notification).toHaveStyle("border: 5px solid green");
  //   // colors are set via rgb
  //   expect(notification).toHaveStyle("color: rgb(0, 128, 0)");
  //   expect(messageMessage).toBeDefined();
  // });
});
