import React from "react";

import "./styles/ad-item.scss";
import { useTodosContext } from "../TodoContext";

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
    <input
      type="text"
      placeholder={placeholder}
      className="ad-item"
      onKeyDown={handleKeyDown}
    />
  );
};

export { AdItem };
