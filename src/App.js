import React, { useEffect, useState } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos.length === 0) return;
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('todos'));
    setTodos(tasks);
  }, []);

  function addTodo(name) {
    setTodos((prev) => [...prev, { name, done: false }]);
  }

  function deleteTodoById(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodoDone(id, newDone) {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: newDone };
      }
      return todo;
    }));
  }

  const numberCompleted = todos.filter((todo) => todo.done).length;
  const numberTotal = todos.length;

  function getMessage() {
    const percentage = Math.ceil((numberCompleted / numberTotal) * 100);

    if (percentage === 0) {
      return 'Try To Do At Least One! 🙏';
    }

    if (percentage === 100) {
      return 'Nice Job For Today! 🎉';
    }

    return 'Keep It Going 💪';
  }

  function renameTodoById(id, newName) {
    setTodos((prev) => prev.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: newName };
      }
      return todo;
    }));
  }

  const handleAddTodo = (name) => {
    addTodo(name);
  };

  const handleRenameTodo = (id, newName) => {
    renameTodoById(id, newName);
  };

  const handleDeleteTodo = (id) => {
    deleteTodoById(id);
  };

  const handleToggleTodo = (id, newDone) => {
    updateTodoDone(id, newDone);
  };

  return (
    <main>
      <h1>
        {numberCompleted}
        /
        {numberTotal}
        {' '}
        Completed
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={handleAddTodo} />
      {todos.map((todo) => (
        <Todos
          key={todo.id}
          name={todo.name}
          done={todo.done}
          onRename={(newName) => handleRenameTodo(todo.id, newName)}
          onTrash={() => handleDeleteTodo(todo.id)}
          onToggle={(newDone) => handleToggleTodo(todo.id, newDone)}
        />
      ))}
    </main>
  );
}

export default App;
