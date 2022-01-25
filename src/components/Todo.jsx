import { useTodos } from "../hooks/useTodos";

export default function Todo({ todo }) {
  const [, setTodos] = useTodos();

  function remove() {
    setTodos((todos) => todos.filter((savedTodo) => savedTodo.id !== todo.id));
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
      <button className="btn">Complete</button>
      <button className="btn" onClick={remove}>
        Delete
      </button>
    </div>
  );
}
