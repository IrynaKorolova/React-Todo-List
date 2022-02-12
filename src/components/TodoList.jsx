import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import Todo from './Todo';

export default function TodoList() {
  const [todos] = useTodos();
  const [sortingParams, setSortingParams] = useState({
    key: 'createdAt',
    order: -1
  });
  function handleChange(e) {
    const [key, order] = e.target.value.split('/')
    setSortingParams({key, order})
  }
  function sortBy(a,b) {
    return (a[sortingParams.key] - b[sortingParams.key]) * sortingParams.order
  }

  return (
    <>
    <h2 className='todo-subheading'>Choose your Todo priority:</h2>
      <select className='select priority-select' name="sorting" onChange={handleChange}>
        <option value="priority/1">Priority low to high</option>
        <option value="priority/-1">Priority high to low</option>
        <option value="status/1">Status new to completed</option>
        <option value="status/-1">Status completed to new</option>
      </select>
      <form action="">
        <input className='search-input' type="search" />
        <button className='search-btn btn' type="submit">Search</button>
      </form>
      <div>
        {todos.sort(sortBy).map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}
