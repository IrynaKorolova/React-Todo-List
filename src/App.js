import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodosProvider from './context/TodosContext';

function App() {
  return (
    <div className="container">
      <TodosProvider>
        <AddTodo />
        <TodoList />
      </TodosProvider>
    </div>
  );
}

export default App;
