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
    setTitle(event.target.value);
  }
  return (
      <form className="form" onSubmit={createTodo}>
      <h1 className="todo-heading">To-Do List <span>&#10004;</span></h1>
      <h2 className="todo-subheading">What`s The Plan For Today?</h2>
        <input className="todo-input"
          value={title}
          onChange={handleChangeTitle}
          type="text"
          name="title"
          placeholder="Todo title"
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
  );
}
