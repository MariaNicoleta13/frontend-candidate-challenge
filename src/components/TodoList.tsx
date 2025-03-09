import { Item } from "./Item";
import "./styles/todo-list.scss";
import { useTodosContext } from "./TodoContext";

export const TodoList = () => {
  const { todos } = useTodosContext();

  return (
    <ul className="todoList">
      {todos.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
};
