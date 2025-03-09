import React from "react";

import "./styles/ad-item.scss";
import { useTodosContext } from "../context/TodoContext";

type AdItemProps = {
  placeholder?: string;
};

const AdItem = ({ placeholder = "Add a new Item" }: AdItemProps) => {
  const { add } = useTodosContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      add(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <section className="input-item-wrapper">
      <input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        data-testid="add-item-input"
      />
    </section>
  );
};

export { AdItem };
