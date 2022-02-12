import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import todoService from "../api/todos";
import { removeTodo, updateTodo } from "../context/TodosContext";
import { nextBtnText, statusText, priorityText } from "../helpers/todos";

export default function Todo({ todo }) {
  const [, dispatchTodos] = useTodos();
  const [showEdit, setShowEdit] = useState(false);

  async function remove() {
    const [deletedTodoError] = await todoService.deleteTodo(todo.id);
    if (!deletedTodoError) {
      dispatchTodos(removeTodo(todo.id));
    } else {
      alert("Deleting todo failed!");
    }
  }

  async function setNextStatus() {
    if (todo.status < 2) {
      const [updatedTodoError, updatedTodo] = await todoService.updateTodo(
        todo.id,
        {
          status: todo.status + 1,
        }
      );
      if (updatedTodo) {
        dispatchTodos(updateTodo(updatedTodo));
      } else {
        console.error("updatedTodoError", updatedTodoError);
      }
    } else {
      remove();
    }
  }

  async function edit(event) {
    event.preventDefault();
    const newTitle = event.target.title.value.trim();

    if (!newTitle) {
      return;
    }
    const [updatedTodoError, updatedTodo] = await todoService.updateTodo(
      todo.id,
      {
        title: newTitle,
      }
    );
    if (updatedTodo) {
      dispatchTodos(updateTodo(updatedTodo));
      setShowEdit(false);
    } else {
      console.error("updatedTodoError", updatedTodoError);
    }
  }

  return (
    <div className="todo">
      <h2 className="todo-title">{todo.title}</h2>
      <h3 className="todo-completed">Status: {statusText[todo.status]}</h3>
      <h3 className="todo-completed">
        Priority: {priorityText[todo.priority]}
      </h3>
      <ul className="todo-list">
        <li>Created at: {new Date(todo.createdAt).toLocaleString()}</li>
        <li className="list-item">
          Updated at:{" "}
          {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "-"}
        </li>
      </ul>
      <p className="todo-text">{todo.body}</p>
      <div className="btn-group">
        <button className="btn todo-btn" onClick={setNextStatus}>
          {nextBtnText[todo.status]} <span>&#10003;</span>
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
