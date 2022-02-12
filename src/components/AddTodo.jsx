import { useState } from "react";
import todoService from "../api/todos";
import { addTodo } from "../context/TodosContext";
import { useTodos } from "../hooks/useTodos";

export default function AddTodo() {
  const [, dispatchTodos] = useTodos();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState(1);
  const [titleError, setTitleError] = useState(null);
  const [createError, setCreateError] = useState(null);

  async function addNewTodo(event) {
    event.preventDefault();
    if (!title) {
      setTitleError("Title is empty!");
      return;
    }
    const newTodo = {
      title,
      body,
      priority: Number(priority),
      createdAt: Date.now(),
      updatedAt: null,
      status: 0,
    };

    setCreateError(null);
    const [createdTodoError, createdTodo] = await todoService.createTodo(
      newTodo
    );
    if (createdTodo) {
      dispatchTodos(addTodo(createdTodo));
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
    <form className="form" onSubmit={addNewTodo}>
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
      <textarea
        className="todo-input"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="5"
        cols="50"
      ></textarea>
      <select
        className="select"
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="2">High</option>
        <option value="1">Regular</option>
        <option value="0">Low</option>
      </select>

      <button className="btn add-btn" type="submit">
        Add ToDo
      </button>
    </form>
  );
}

