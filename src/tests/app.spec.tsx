import App from "../App";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DEFAULT_TODO_ITEMS } from "../components/context/constants";
import { EMPTY_ERROR } from "../components/Item/hooks/useItemError";

describe("TodoApp", () => {
  it("renders app", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("renders initial todo items", () => {
    render(<App />);

    DEFAULT_TODO_ITEMS.forEach((item) => {
      expect(screen.getByDisplayValue(item.text)).toBeInTheDocument();
      expect(screen.getByTestId(`todo-item-${item.id}`)).toBeInTheDocument();
    });
  });

  it("marks first item as done", () => {
    render(<App />);

    const firstItem = DEFAULT_TODO_ITEMS[0];

    expect(screen.getByDisplayValue(firstItem.text)).toBeInTheDocument();

    const firstItemCheckbox = screen.getByTestId(
      `todo-item-checkbox-${firstItem.id}`
    );

    expect(firstItemCheckbox).toBeChecked();
  });

  it("adds a new item and places it first", () => {
    render(<App />);

    const newItemText = "New item";

    const input = screen.getByTestId("add-item-input");

    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: newItemText } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const firstListItem = screen.getAllByRole("listitem")[0];
    const firstValueElement = within(firstListItem).getByRole("textbox");

    expect(firstValueElement).toHaveValue(newItemText);
  });

  it("edits an item", () => {
    render(<App />);

    const firstItem = DEFAULT_TODO_ITEMS[0];
    const newText = `Edited ${firstItem.text}`;

    const firstItemInput = screen.getByDisplayValue(firstItem.text);

    fireEvent.change(firstItemInput, { target: { value: newText } });

    expect(firstItemInput).toHaveValue(newText);
  });

  it("deletes an item", async () => {
    render(<App />);

    const firstItem = DEFAULT_TODO_ITEMS[0];

    const firstItemRemoveButton = screen.getByTestId(`remove-${firstItem.id}`);

    fireEvent.click(firstItemRemoveButton);

    // Wait for remove animation
    await waitFor(() => {
      expect(screen.queryByDisplayValue(firstItem.text)).toBeNull();
    });
  });

  it("marks an item as done", () => {
    render(<App />);

    const secondItem = DEFAULT_TODO_ITEMS[1];

    const firstItemCheckbox = screen.getByTestId(
      `todo-item-checkbox-${secondItem.id}`
    );

    expect(firstItemCheckbox).not.toBeChecked();

    fireEvent.click(firstItemCheckbox);

    expect(firstItemCheckbox).toBeChecked();
  });

  it("marks an item as undone", () => {
    render(<App />);

    const firstItem = DEFAULT_TODO_ITEMS[0];

    const firstItemCheckbox = screen.getByTestId(
      `todo-item-checkbox-${firstItem.id}`
    );

    expect(firstItemCheckbox).toBeChecked();

    fireEvent.click(firstItemCheckbox);

    expect(firstItemCheckbox).not.toBeChecked();
  });

  it("does not create an empty entry", () => {
    render(<App />);

    const input = screen.getByTestId("add-item-input");

    const initialListLength = screen.getAllByRole("listitem").length;

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const updatedListLength = screen.getAllByRole("listitem").length;

    expect(updatedListLength).toBe(initialListLength);
  });

  it("shows empty entry error on edit", () => {
    render(<App />);

    const lastItem = DEFAULT_TODO_ITEMS[1];
    const firstItemInput = screen.getByDisplayValue(lastItem.text);

    fireEvent.change(firstItemInput, { target: { value: "" } });

    expect(screen.getByText(EMPTY_ERROR)).toBeDefined();

    fireEvent.change(firstItemInput, { target: { value: "A" } });
    expect(screen.queryByText(EMPTY_ERROR)).toBeNull();
  });
});
