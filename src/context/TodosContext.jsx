import { createContext, useState, useEffect } from "react";

const initialState = JSON.parse(localStorage.getItem("todos")) || [];

export const TodosContext = createContext(initialState);

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState(initialState);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {children}
    </TodosContext.Provider>
  );
}
