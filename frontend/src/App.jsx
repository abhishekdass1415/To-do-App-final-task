import { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(API_URL, { title });
      setTodos([...todos, response.data]);
      setError(null);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
      throw error;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
      throw error;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📋 My ToDo App</h1>
          <p>Stay organized and get things done!</p>
        </header>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchTodos} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        <AddTodo onAddTodo={addTodo} />
        <TodoList 
          todos={todos} 
          onDeleteTodo={deleteTodo}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;