import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Item } from "./Item";
import { useTodosContext } from "../context/TodoContext";
import { EMPTY_ERROR, useItemError } from "./hooks/useItemError";

const todoItem = {
  id: 1,
  text: "Test Todo",
  done: false,
  recentlyAdded: true,
};

jest.mock("../context/TodoContext", () => ({
  useTodosContext: jest.fn(),
}));

jest.mock("./hooks/useItemError");

describe("Item", () => {
  const toggleCompletionMock = jest.fn();
  const removeMock = jest.fn();
  const handleTextChangeMock = jest.fn();

  beforeEach(() => {
    (useTodosContext as jest.Mock).mockReturnValue({
      toggleCompletion: toggleCompletionMock,
      remove: removeMock,
    });
    (useItemError as jest.Mock).mockReturnValue({
      error: null,
      handleTextChange: handleTextChangeMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders item", () => {
    render(<Item item={todoItem} />);
    const itemCheckbox = screen.getByTestId(
      `todo-item-checkbox-${todoItem.id}`
    );

    expect(screen.getByTestId(`todo-item-${todoItem.id}`)).toBeInTheDocument();
    expect(itemCheckbox).not.toBeChecked();
    expect(screen.getByDisplayValue(todoItem.text)).toBeInTheDocument();
    expect(screen.getByTestId(`remove-${todoItem.id}`)).toBeInTheDocument();
  });

  it("calls completion function when clicked", async () => {
    render(<Item item={todoItem} />);
    const checkbox = screen.getByTestId(
      `todo-item-checkbox-${todoItem.id}`
    ) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(toggleCompletionMock).toHaveBeenCalledWith(todoItem.id);
  });
  it("edits text", () => {
    render(<Item item={todoItem} />);

    const newText = `Updated ${todoItem.text}`;
    const input = screen.getByDisplayValue(todoItem.text);

    fireEvent.change(input, { target: { value: newText } });

    expect(handleTextChangeMock).toHaveBeenCalledWith(todoItem.id, newText);
  });

  it("removes the item", async () => {
    render(<Item item={todoItem} />);

    const removeButton = screen.getByTestId(`remove-${todoItem.id}`);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(removeMock).toHaveBeenCalledTimes(1);
    });
  });
  it("displays error message", async () => {
    render(<Item item={todoItem} />);

    const itemInput = screen.getByDisplayValue(todoItem.text);

    fireEvent.change(itemInput, { target: { value: "" } });

    expect(handleTextChangeMock).toHaveBeenCalledWith(todoItem.id, "");

    (useItemError as jest.Mock).mockReturnValue({
      error: EMPTY_ERROR,
      handleTextChange: handleTextChangeMock,
    });

    render(<Item item={todoItem} />);

    expect(screen.getByText(EMPTY_ERROR)).toBeInTheDocument();
  });
});
