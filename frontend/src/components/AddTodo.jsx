import { useState } from 'react';

const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAddTodo(title.trim());
        setTitle('');
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="todo-input"
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        className="add-btn"
        disabled={isSubmitting || !title.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default AddTodo;