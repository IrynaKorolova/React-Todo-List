import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { deleteTodo } from "../api/todos";

export default function Todo({ todo }) {
  const [, setTodos] = useTodos();
  const [showEdit, setShowEdit] = useState(false);

  //DELETE
  async function remove() {
     await deleteTodo(todo.id);
    setTodos((todos) => todos.filter((savedTodo) => savedTodo.id !== todo.id));
  }

  function complete() {
    //update

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

    //update

    setTodos((todos) => {
      const todosCopy = JSON.parse(JSON.stringify(todos));
      const currentTodo = todosCopy.find((item) => item.id === todo.id);
      currentTodo.title = newTitle;
      return todosCopy;
    });
    setShowEdit(false);
  }

  return (
    <div className="todo">
      <h2 className="todo-title">{todo.title}</h2>
      <h3 className="todo-completed">
        Completed: {todo.completed ? "Yes" : "No"}
      </h3>
      <ul className="todo-list">
        <li>Created at: {new Date(todo.createdAt).toLocaleString()}</li>
        <li className="list-item">
          Updated at:{" "}
          {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "-"}
        </li>
      </ul>
      <div className="btn-group">
        <button className="btn todo-btn" onClick={complete}>
          Complete <span>&#10003;</span>
        </button>
        <button className="btn todo-btn" onClick={remove}>
          Delete <span>&#10005;</span>
        </button>
        {!showEdit && (
          <button className="btn todo-btn" onClick={() => setShowEdit(true)}>
            Edit <span>&#9998;</span>
          </button>
        )}
      </div>
      {showEdit && (
        <form onSubmit={edit}>
          <input className="edit-input" type="text" name="title" />
          <button className="btn edit-btn" type="submit">
            OK
          </button>
        </form>
      )}
    </div>
  );
}
