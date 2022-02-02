import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { deleteTodo, updateTodo } from "../api/todos";
import { REMOVE, UPDATE } from "../context/TodosContext";

export default function Todo({ todo }) {
  const [, dispatchTodos] = useTodos();
  const [showEdit, setShowEdit] = useState(false);

  //DELETE
  async function remove() {
    const [deletedTodoError] = await deleteTodo(todo.id);
    if (!deletedTodoError) {
      dispatchTodos({ type: REMOVE, payload: todo.id });
    } else {
      alert("Deleting todo failed!");
    }
  }

  async function complete() {
    //update
    const [updatedTodoError, updatedTodo] = await updateTodo(todo.id, {
      completed: true,
    });
    if (updatedTodo) {
      dispatchTodos({ type: UPDATE, payload: updatedTodo });
    } else {
      console.error("updatedTodoError", updatedTodoError);
    }
  }

  async function edit(event) {
    event.preventDefault();
    const newTitle = event.target.title.value.trim();
    //update
    if (!newTitle) {
      return;
    }
    const [updatedTodoError, updatedTodo] = await updateTodo(todo.id, {
      title: newTitle,
    });
    if (updatedTodo) {
      dispatchTodos({ type: UPDATE, payload: updatedTodo });
      setShowEdit(false);
    } else {
      console.error("updatedTodoError", updatedTodoError);
    }
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
