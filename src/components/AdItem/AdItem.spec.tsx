import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useTodosContext } from "../context/TodoContext";
import { AdItem } from "./AdItem";

jest.mock("../context/TodoContext", () => ({
  useTodosContext: jest.fn(),
}));

describe("AdItem", () => {
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
    render(<AdItem />);
    const input = screen.getByPlaceholderText("Add a new Item");
    expect(input).toBeInTheDocument();
  });

  it("uses placeholder", () => {
    const newPlaceholder = "New placeholder";
    render(<AdItem placeholder={newPlaceholder} />);
    const input = screen.getByPlaceholderText(newPlaceholder);
    expect(input).toBeInTheDocument();
  });

  it("makes a new entry", () => {
    render(<AdItem />);
    const input = screen.getByTestId("add-item-input");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).toHaveBeenCalledWith("New Todo");
    //reset input field value
    expect(input).toHaveValue("");
  });

  it("does not create empty entry", () => {
    render(<AdItem />);
    const input = screen.getByTestId("add-item-input");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(addMock).not.toHaveBeenCalled();
  });
});
