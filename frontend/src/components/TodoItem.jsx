import { useState } from 'react';

const TodoItem = ({ todo, onDeleteTodo }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      await onDeleteTodo(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="todo-item">
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>
      <button 
        onClick={handleDelete}
        className="delete-btn"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default TodoItem;