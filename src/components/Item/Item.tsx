import React, { useEffect, useRef, useState } from "react";

import "./styles/item.scss";
import { ErrorIcon, RemoveIcon } from "../icons";
import { TodoItem } from "../types";
import { useTodosContext } from "../context/TodoContext";
import { useItemError } from "./hooks/useItemError";
import { clsx } from "clsx";

type ItemProps = {
  item: TodoItem;
};

const Item = ({ item }: ItemProps) => {
  const { remove, toggleCompletion } = useTodosContext();
  const [shouldRemove, setShouldRemove] = useState(false);
  const [isRecentlyAdded, setIsRecentlyAdded] = useState(item.recentlyAdded);
  const { error, handleTextChange } = useItemError();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsRecentlyAdded(false);
    event.stopPropagation();
    setShouldRemove(true);
    setTimeout(() => {
      remove(item.id);
    }, 500);
  };

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const textLength = item.text.length;

      textarea.style.width = `${textLength ? Math.min(45, textLength) : 1}ch`;
      textarea.style.height = "auto";
      textarea.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [item.text]);

  return (
    <li className="item-wrapper">
      <div
        data-testid={`todo-item-${item.id}`}
        className={clsx("item", {
          remove: shouldRemove,
          add: isRecentlyAdded,
          error: error,
        })}
      >
        <input
          type="checkbox"
          onChange={() => toggleCompletion(item.id)}
          className="checkbox"
          checked={item.done}
          disabled={!!error}
          data-testid={`todo-item-checkbox-${item.id}`}
        />
        <textarea
          rows={1}
          value={item.text}
          className={clsx("value", { done: item.done })}
          onChange={(e) => handleTextChange(item.id, e.target.value)}
          onBlur={(e) => handleTextChange(item.id, e.target.value)}
          ref={textareaRef}
        />
        <button onClick={handleRemove} data-testid={`remove-${item.id}`}>
          <RemoveIcon size={16} />
        </button>
      </div>
      {
        <div className="error-message">
          {error && (
            <>
              <ErrorIcon />
              <span>{error}</span>
            </>
          )}
        </div>
      }
    </li>
  );
};

export { Item };
