import { useState } from "react";
import { createTodo } from "../api/todos";
import { useTodos } from "../hooks/useTodos";

export default function AddTodo() {
  const [, setTodos] = useTodos(); 
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [createError, setCreateError] = useState(null);

  async function addTodo(event) {
    event.preventDefault();
    if (!title) {
      setTitleError("Title is empty!");
      return;
    }
    const newTodo = {
      title,
      createdAt: Date.now(),
      updatedAt: null,
      completed: false,
    };

    //create
    setCreateError(null);
    const [createdTodoError, createdTodo] = await createTodo(newTodo);
    if (createdTodo) {
      setTodos((todos) => [...todos, createdTodo]);
      setTitle("");
    } else {
      setCreateError("Creating todo failed! Try again.");
      console.error("createdTodoError", createdTodoError);
    }
  }

  function handleChangeTitle(event) {
    setTitle(event.target.value);
    setTitleError(null);
    setCreateError(null);
  }

  return (
    <form className="form" onSubmit={addTodo}>
      {titleError && <p className="alert">{titleError}</p>}
      <p className="alert">{createError}</p>
      <input
        className="todo-input"
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
