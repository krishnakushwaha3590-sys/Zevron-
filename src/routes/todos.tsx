import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Filter, Trash } from 'lucide-react';
import { useTodos } from '@/lib/hooks/useTodos';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/todos')();

function TodosPage() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted, getStats, isLoaded } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const stats = getStats();
  const categories = [...new Set(todos.map(t => t.category).filter(Boolean))];

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && !todo.completed) ||
      (filterStatus === 'completed' && todo.completed);
    const matchesCategory = filterCategory === 'all' || todo.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category: category.trim() || undefined,
      completed: false,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'text-green-500 bg-green-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-royal flex items-center justify-center">
        <div className="text-foreground text-lg">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-royal p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">📝 My Tasks</h1>
          <p className="text-foreground/70">Stay organized and track your daily tasks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Total</div>
            <div className="text-2xl font-bold text-gold">{stats.total}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Active</div>
            <div className="text-2xl font-bold text-accent">{stats.pending}</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-sm text-muted-foreground mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <form onSubmit={handleAddTodo} className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Add New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="app-input"
              required
            />
            <textarea
              placeholder="Task description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="app-input resize-none h-20"
            />
            <div className="grid grid-cols-2 gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="app-input"
              >
                <option value="low">Priority: Low</option>
                <option value="medium">Priority: Medium</option>
                <option value="high">Priority: High</option>
              </select>
              <input
                type="text"
                placeholder="Category (optional)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="app-input"
              />
            </div>
            <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2">
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition',
                filterStatus === 'all'
                  ? 'bg-gold text-background'
                  : 'bg-card border border-border text-foreground hover:border-gold'
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition',
                filterStatus === 'active'
                  ? 'bg-accent text-foreground'
                  : 'bg-card border border-border text-foreground hover:border-accent'
              )}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition',
                filterStatus === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-card border border-border text-foreground hover:border-green-500'
              )}
            >
              Completed
            </button>
          </div>

          {categories.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-card border border-border text-foreground"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">No tasks to show</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={cn(
                  'bg-card border border-border rounded-lg p-4 transition-all hover:border-gold',
                  todo.completed && 'opacity-60'
                )}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mt-1 flex-shrink-0 transition-colors hover:text-gold"
                  >
                    {todo.completed ? (
                      <CheckCircle2 size={24} className="text-green-500" />
                    ) : (
                      <Circle size={24} className="text-muted-foreground" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'font-semibold text-foreground',
                      todo.completed && 'line-through text-muted-foreground'
                    )}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {todo.priority && (
                        <span className={cn('text-xs px-2 py-1 rounded-full font-medium', getPriorityColor(todo.priority))}>
                          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                      )}
                      {todo.category && (
                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-500/10 text-blue-400">
                          {todo.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clear Completed Button */}
        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-card border border-border text-foreground hover:border-red-500 hover:text-red-500 transition"
          >
            <Trash size={20} />
            Clear Completed Tasks ({stats.completed})
          </button>
        )}
      </div>
    </div>
  );
}

Route.component = TodosPage;
