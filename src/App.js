import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn JavaScript", completed: false },
    { id: 2, text: "Learn React", completed: false },
    { id: 3, text: "Build a project", completed: false },
    { id: 4, text: "Exercise", completed: false },
    { id: 5, text: "Read a book", completed: false },
    { id: 6, text: "Meditate", completed: false },
    { id: 7, text: "Write a blog post", completed: false },
  ]);

  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput addTodo={addTodo} />
      </header>

      <section className="main">
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((t) => !t.completed).length}</strong> items left
        </span>
        <ul className="filters">
          <li>
            <button
              className={filter === "all" ? "selected" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filter === "active" ? "selected" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filter === "completed" ? "selected" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={() => setTodos(todos.filter((t) => !t.completed))}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
