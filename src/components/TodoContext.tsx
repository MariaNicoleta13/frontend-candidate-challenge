import { createContext, useState, ReactNode, useContext } from "react";
import { TodoItem } from "./types";
import { DEFAULT_TODO_ITEMS } from "./constants";

type TodoContextType = {
  todos: TodoItem[];
  remove: (id: number) => void;
  toggleCompletion: (id: number) => void;
  add: (text: string) => void;
  edit: (id: number, newText: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoItem[]>(DEFAULT_TODO_ITEMS);

  const remove = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const add = (text: string) => {
    setTodos((prevTodos) => [
      {
        text,
        done: false,
        recentlyAdded: true,
        id: prevTodos.at(0)
          ? Math.max(...prevTodos.map((todo) => todo.id)) + 1
          : 1,
      },
      ...prevTodos,
    ]);
  };

  const edit = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{ todos, remove, toggleCompletion, add, edit }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const useTodosContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};

export { TodoProvider, useTodosContext };
