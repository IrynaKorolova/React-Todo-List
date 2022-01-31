import { createContext, useState, useEffect } from "react";
import { getTodos } from "../api/todos";

const initialState = []; //???

export const TodosContext = createContext(initialState);

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState(initialState);
  //get

   useEffect(() => {
      (async function () {
        const [todosError, todos] = await getTodos();
        if (todosError) {
        console.error('error');
        } else {
          console.log(todos)
        }
      })();
    }, []);


  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {children}
    </TodosContext.Provider>
  );
}
