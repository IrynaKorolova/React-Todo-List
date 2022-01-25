import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export default function AddTodo() {
  const [, setTodos] = useTodos();
  const [title, setTitle] = useState("");
  function createTodo(event) {
    event.preventDefault();
    const newTodo = {
      id: Date.now(),
      title,
      createdAt: Date.now(),
      updatedAt: null,
      completed: false,
    };
    setTodos((todos) => [...todos, newTodo]);
    setTitle("");
  }
  function handleChangeTitle(event) {
    setTitle(event.target.value.trim());
  }
  return (
    <form onSubmit={createTodo}>
      <input
        value={title}
        onChange={handleChangeTitle}
        type="text"
        name="title"
        placeholder="Todo title"
      />
      <button type="submit">Add</button>
    </form>
  );
}
