import React, { useState } from "react";

import "./styles/item.scss";
import { ErrorIcon, RemoveIcon } from "../icons";
import { TodoItem } from "../types";
import { useTodosContext } from "../TodoContext";

type ItemProps = {
  item: TodoItem;
};

const Item = ({ item }: ItemProps) => {
  const { remove, toggleCompletion, edit } = useTodosContext();
  const [shouldRemove, setShouldRemove] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShouldRemove(true);
    setTimeout(() => {
      remove(item.id);
    }, 500);
  };
  //TODOL css handler
  const handleTextChange = (text: string) => {
    // console.log("text", text, item.text);
    if (text.trim() === "") {
      setError("Item cannot be empty");
    } else {
      setError(null);
      edit(item.id, text);
    }
  };

  const handleOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleTextChange(e.target.value);
  };

  const handleOnBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      edit(item.id, e.target.defaultValue);
    }
    return handleTextChange(e.target.value);
  };

  return (
    <li className="item-wrapper">
      <div
        data-testid={`todo-item-${item.id}`}
        className={`item  ${shouldRemove ? "remove" : ""} ${
          item.recentlyAdded ? "add" : ""
        } ${error ? "error" : ""}`}
        // onClick={onToggle} //TODO fix bug
      >
        <input
          type="checkbox"
          onChange={() => toggleCompletion(item.id)}
          className="checkbox"
          checked={item.done}
          disabled={!!error}
        />
        <input
          type="text"
          value={item.text}
          className={`value ${item.done ? "done" : ""}`}
          size={item.text.length}
          onChange={handleOnChangeEvent}
          onBlur={handleOnBlurEvent}
        />
        <button onClick={handleRemove}>
          <RemoveIcon size={16} />
        </button>
      </div>
      {
        <div className="error-message">
          {error && (
            <>
              <ErrorIcon />
              <span> {error}</span>
            </>
          )}
        </div>
      }
    </li>
  );
};

export { Item };
