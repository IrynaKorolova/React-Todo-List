import { useTodos } from "../hooks/useTodos";

export default function AddTodo() {
  const [, setTodos] = useTodos();

  function createTodo(event) {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: event.target.title.value.trim(),
      createdAt: Date.now(),
      updatedAt: null,
      completed: false,
    };

    setTodos((todos) => [...todos, newTodo]);
    event.target.reset();
  }
  return (
    <form onSubmit={createTodo}>
      <input type="text" name="title" placeholder="Todo title" />
      <button type="submit">Add</button>
    </form>
  );
}
