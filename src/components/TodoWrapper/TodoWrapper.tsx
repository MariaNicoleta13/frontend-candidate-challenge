import { AddItem } from "../AddItem";
import { TodoList } from "../TodoList/TodoList";
import { TodoProvider } from "../context/TodoContext";

export const TodoWrapper = () => {
  return (
    <TodoProvider>
      <>
        <AddItem />
        <TodoList />
      </>
    </TodoProvider>
  );
};
