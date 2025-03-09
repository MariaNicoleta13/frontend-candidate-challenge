import { Item } from "../Item";
import "./styles/todo-list.scss";
import { useTodosContext } from "../context/TodoContext";

export const EMPTY_MESSAGE = "Write your first todo";

export const TodoList = () => {
  const { todos } = useTodosContext();

  return (
    <section className="todo-list-wrapper">
      {todos.length > 0 ? (
        <ul className="todo-list" data-testid="todo-list-ul">
          {todos.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <p>{EMPTY_MESSAGE}</p>
      )}
    </section>
  );
};
