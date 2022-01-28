import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TodosProvider from "./context/TodosContext";

function App() {
  // useEffect(() => {
  //   (async function () {
  //     const [todosError, todos] = await getTodos()
  //     if (!todosError) {
  //       console.log(todos);
  //     }
  //   })()
  // }, []);

  return (
    <div className="container">
      <h1 className="todo-heading">
        To-Do List <span>&#10004;</span>
      </h1>
      <h2 className="todo-subheading">What`s The Plan For Today?</h2>
      <TodosProvider>
        <AddTodo />
        <TodoList />
      </TodosProvider>
    </div>
  );
}

export default App;
