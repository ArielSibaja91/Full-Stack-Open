import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";

test("form calls event handler with right details", async () => {
  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<AddBlog newBlog={mockHandler} />);

  const titleInput = screen.getByPlaceholderText("write the title");
  const authorInput = screen.getByPlaceholderText("write the author");
  const urlInput = screen.getByPlaceholderText("write the url");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "testing title");
  await user.type(authorInput, "testing author");
  await user.type(urlInput, "https://fullstackopen.com");
  await user.click(sendButton);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("testing title");
  expect(mockHandler.mock.calls[0][0].author).toBe("testing author");
  expect(mockHandler.mock.calls[0][0].url).toBe("https://fullstackopen.com");
});
