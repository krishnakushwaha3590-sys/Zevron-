import { useState, useEffect } from 'react';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

const TODOS_STORAGE_KEY = 'zevron_todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        const todosWithDates = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        setTodos(todosWithDates);
      } catch (error) {
        console.error('Failed to parse saved todos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    return newTodo;
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getStats = () => {
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
    };
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    getStats,
    isLoaded,
  };
}
