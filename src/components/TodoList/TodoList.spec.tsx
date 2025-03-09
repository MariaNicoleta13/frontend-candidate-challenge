import React from "react";
import { render, screen } from "@testing-library/react";
import { EMPTY_MESSAGE, TodoList } from "./TodoList";
import { useTodosContext } from "../context/TodoContext";
import { TodoItem } from "../types";

const mockTodos: TodoItem[] = [
  {
    id: 1,
    text: "Test Todo 1",
    done: false,
    recentlyAdded: true,
  },
  {
    id: 2,
    text: "Test Todo 2",
    done: false,
    recentlyAdded: true,
  },
];

jest.mock("../context/TodoContext", () => ({
  useTodosContext: jest.fn(),
}));

describe("TodoList", () => {
  it("renders TodoList", () => {
    (useTodosContext as jest.Mock).mockReturnValue({ todos: mockTodos });
    render(<TodoList />);

    mockTodos.forEach((todo) => {
      expect(screen.getByText(todo.text)).toBeInTheDocument();
    });
  });
  it("shows message when array is empty", () => {
    (useTodosContext as jest.Mock).mockReturnValue({ todos: [] });

    render(<TodoList />);
    expect(screen.getByText(EMPTY_MESSAGE)).toBeInTheDocument();
  });
});
