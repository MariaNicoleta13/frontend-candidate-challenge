import { AdItem } from "../AdItem";
import { TodoList } from "../TodoList/TodoList";
import { TodoProvider } from "../context/TodoContext";

export const TodoWrapper = () => {
  return (
    <TodoProvider>
      <>
        <AdItem />
        <TodoList />
      </>
    </TodoProvider>
  );
};
