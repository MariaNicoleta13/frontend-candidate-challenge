import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useTodosContext } from "../context/TodoContext";
import { AddItem } from "./AddItem";

jest.mock("../context/TodoContext", () => ({
  useTodosContext: jest.fn(),
}));

describe("AddItem", () => {
  const addMock = jest.fn();

  beforeEach(() => {
    (useTodosContext as jest.Mock).mockReturnValue({
      add: addMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("uses default placeholder", () => {
    render(<AddItem />);
    const input = screen.getByPlaceholderText("Add a new Item");
    expect(input).toBeInTheDocument();
  });

  it("uses custom placeholder", () => {
    const newPlaceholder = "New placeholder";
    render(<AddItem placeholder={newPlaceholder} />);
    const input = screen.getByPlaceholderText(newPlaceholder);
    expect(input).toBeInTheDocument();
  });

  it("makes a new entry", () => {
    render(<AddItem />);
    const input = screen.getByTestId("add-item-input");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).toHaveBeenCalledWith("New Todo");
    //reset input field value
    expect(input).toHaveValue("");
  });

  it("does not create empty entry", () => {
    render(<AddItem />);
    const input = screen.getByTestId("add-item-input");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).not.toHaveBeenCalled();
  });
});
