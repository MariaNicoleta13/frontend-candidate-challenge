import { AdItem } from "./AdItem";
import { TodoList } from "./TodoList";
import { TodoProvider } from "./TodoContext";

export const TodoWrapper = () => {
  return (
    <>
      <TodoProvider>
        <>
          <AdItem />
          <TodoList />
        </>
      </TodoProvider>
    </>
  );
};
