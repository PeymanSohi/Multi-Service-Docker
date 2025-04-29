import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = async () => {
    const text = prompt("Enter a new todo");
    if (text) {
      const response = await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
