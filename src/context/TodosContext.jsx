import { createContext, useReducer, useEffect } from 'react';
import todoService from '../api/todos';

const initialState = [];

export const TodosContext = createContext(initialState);

export const SET = 'SET';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const UPDATE = 'UPDATE';

export default function TodosProvider({ children }) {
  const [todos, dispatchTodos] = useReducer(todosReducer, initialState);

  useEffect(() => {
    (async function () {
      const [todosError, todos] = await todoService.getTodos();
      if (todosError) {
        console.error('error');
      } else {
        console.log(todos);
        dispatchTodos(setTodos(todos));
      }
    })();
  }, []);
  return <TodosContext.Provider value={[todos, dispatchTodos]}>{children}</TodosContext.Provider>;
}

function todosReducer(todos, action) {
  try {
    switch (action.type) {
      case SET: {
        return action.payload;
      }
      case ADD: {
        return [...todos, action.payload];
      }
      case REMOVE: {
        return todos.filter((savedTodo) => savedTodo.id !== action.payload);
      }
      case UPDATE: {
        const todosCopy = [...todos];
        const updatedTodoIdx = todosCopy.findIndex((todo) => todo.id === action.payload.id);
        todosCopy.splice(updatedTodoIdx, 1, action.payload);
        return todosCopy;
      }
      default:
        throw new Error(`Wrong action.type! ${action.type}`);
    }
  } catch (error) {
    console.warn(error);
    return todos;
  }
}

export function setTodos(todos) {
  return { type: SET, payload: todos };
}
export function addTodo(newTodo) {
  return { type: ADD, payload: newTodo };
}
export function removeTodo(todoId) {
  return { type: REMOVE, payload: todoId };
}
export function updateTodo(updatedTodo) {
  return { type: UPDATE, payload: updatedTodo };
}
