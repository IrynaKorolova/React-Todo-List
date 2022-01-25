import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export default function Todo({ todo }) {
  const [, setTodos] = useTodos();
  const [showEdit, setShowEdit] = useState(false);
  function remove() {
    setTodos((todos) => todos.filter((savedTodo) => savedTodo.id !== todo.id));
  }
  function complete() {
    setTodos((todos) => {
      const todosCopy = JSON.parse(JSON.stringify(todos));
      const currentTodo = todosCopy.find((item) => item.id === todo.id);
      currentTodo.completed = true;
      return todosCopy;
    });
  }
  function edit(event) {
    event.preventDefault();
    const newTitle = event.target.title.value.trim();
    setTodos((todos) => {
      const todosCopy = JSON.parse(JSON.stringify(todos));
      const currentTodo = todosCopy.find((item) => item.id === todo.id);
      currentTodo.title = newTitle;
      return todosCopy;
    });
    setShowEdit(false);
  }
  return (
    <div>
      <h2>{todo.title}</h2>
      <h3>Completed: {todo.completed ? "Yes" : "No"}</h3>
      <ul>
        <li>Created at: {new Date(todo.createdAt).toLocaleString()}</li>
        <li>
          Updated at:{" "}
          {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "-"}
        </li>
      </ul>
      <button onClick={complete}>Complete</button>
      <button onClick={remove}>Delete</button>
      {!showEdit && <button onClick={() => setShowEdit(true)}>Edit</button>}
      {showEdit && (
        <form onSubmit={edit}>
          <input type="text" name="title" />
          <button type="submit">OK</button>
        </form>
      )}
    </div>
  );
}
