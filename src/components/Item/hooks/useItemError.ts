import { useCallback, useState } from "react";
import { useTodosContext } from "../../context/TodoContext";

const EMPTY_ERROR = "Item cannot be empty";

const useItemError = () => {
  const { edit } = useTodosContext();
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = useCallback(
    (itemId: number, text: string) => {
      if (text.trim() === "") {
        setError(EMPTY_ERROR);
      } else {
        setError(null);
      }
      edit(itemId, text);
    },
    [edit]
  );

  return { error, handleTextChange };
};

export { useItemError, EMPTY_ERROR };
