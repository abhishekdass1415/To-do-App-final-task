import TodoItem from './TodoItem';

const TodoList = ({ todos, onDeleteTodo, loading }) => {
  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="no-todos">
        <p>No todos yet. Add your first task above! 📝</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h3>Your Tasks ({todos.length})</h3>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;