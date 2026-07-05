# 📝 To-Do List Application

A beautiful, responsive task management application built with React and TypeScript, featuring local storage functionality.

## Features ✨

### Core Functionality
- ✅ **Create Tasks** - Add new tasks with title and optional description
- ✅ **Mark Complete** - Check off completed tasks with visual feedback
- ✅ **Delete Tasks** - Remove tasks you no longer need
- ✅ **Local Storage** - All data persists in browser (no server needed)
- ✅ **Real-time Sync** - Changes saved instantly

### Advanced Features
- 📊 **Statistics Dashboard** - Track total, active, and completed tasks
- 🏷️ **Categories** - Organize tasks by custom categories
- 🎯 **Priority Levels** - Set low, medium, or high priority for each task
- 🔍 **Smart Filters** - Filter by status (all/active/completed) and category
- 📝 **Task Descriptions** - Add detailed descriptions to tasks
- 🗑️ **Bulk Clear** - Remove all completed tasks at once

## File Structure

```
src/
├── lib/
│   └── hooks/
│       └── useTodos.ts          # React hook for todo logic
├── routes/
│   ├── __root.tsx              # Root layout
│   ├── index.tsx               # Home page
│   └── todos.tsx               # Todo list page
└── ...
```

## How It Works

### useTodos Hook
The `useTodos` custom hook manages all todo operations:

```typescript
const { 
  todos,           // Array of todos
  addTodo,         // Add new todo
  updateTodo,      // Update existing todo
  deleteTodo,      // Delete todo
  toggleTodo,      // Mark as complete/incomplete
  clearCompleted,  // Remove all completed
  getStats,        // Get statistics
  isLoaded         // Loading state
} = useTodos();
```

### Local Storage
- **Key**: `zevron_todos`
- **Format**: JSON array of todos
- **Auto-save**: Triggered on any change
- **Auto-load**: On component mount
- **Date handling**: Dates are properly serialized/deserialized

## Todo Data Structure

```typescript
interface Todo {
  id: string;                    // Unique identifier
  title: string;                 // Task title
  description?: string;          // Optional description
  completed: boolean;            // Completion status
  createdAt: Date;              // Creation timestamp
  dueDate?: Date;               // Optional due date
  category?: string;            // Optional category
  priority?: 'low' | 'medium' | 'high';  // Optional priority
}
```

## Usage

### Navigate to Todo App
```
http://localhost:5173/todos
```

### Create a Task
1. Enter task title
2. (Optional) Add description
3. Select priority level
4. (Optional) Add category
5. Click "Add Task"

### Filter Tasks
- **Status Filters**: All / Active / Completed
- **Category Filter**: Select specific category
- **Combination**: Use both filters together

### Manage Tasks
- **Complete**: Click the circle icon to mark as done
- **Delete**: Click trash icon to remove
- **View**: Completed tasks appear with strikethrough

### Statistics
- **Total**: All tasks created
- **Active**: Pending tasks
- **Completed**: Finished tasks

## Color Scheme 🎨

| Element | Color |
|---------|-------|
| Background | Deep Midnight Blue |
| Text | Warm Ivory |
| Buttons | Gold Gradient |
| High Priority | Red |
| Medium Priority | Yellow |
| Low Priority | Green |
| Completed | Muted |

## Local Storage Example

```json
[
  {
    "id": "1720172800000",
    "title": "Complete project",
    "description": "Finish the to-do list application",
    "completed": false,
    "createdAt": "2026-07-05T10:20:00.000Z",
    "category": "Work",
    "priority": "high"
  },
  {
    "id": "1720172900000",
    "title": "Buy groceries",
    "completed": true,
    "createdAt": "2026-07-05T10:21:40.000Z",
    "category": "Shopping",
    "priority": "medium"
  }
]
```

## Browser Storage Limit
- **Typical Limit**: 5-10 MB per domain
- **Estimated Todos**: ~50,000+ tasks (at ~100 bytes per todo)
- **Clear Data**: Use browser's clear storage or manually edit localStorage

## Keyboard Shortcuts (Future Enhancement)
- `Cmd/Ctrl + K` - Focus search
- `Cmd/Ctrl + N` - New task
- `Cmd/Ctrl + Enter` - Add task from form

## Deployment

The app works on any static host since it uses local storage:
- Vercel
- Netlify
- GitHub Pages
- Any HTTP server

## Performance

- ⚡ **Fast Renders**: Uses React hooks efficiently
- 💾 **Minimal Storage**: JSON stored once per session
- 🎯 **No Network**: Everything happens locally
- 📱 **Responsive**: Works on all devices

## Privacy

✅ All data stored locally in your browser
✅ No server communication
✅ No tracking or analytics
✅ No cloud sync (by design)

## Future Enhancements 🚀

- [ ] Cloud sync with Supabase
- [ ] Dark/Light mode toggle
- [ ] Drag & drop reordering
- [ ] Recurring tasks
- [ ] Due date reminders
- [ ] Export to PDF/CSV
- [ ] Subtasks
- [ ] Collaboration features
- [ ] Mobile app (React Native)
- [ ] Voice input

---

**Last Updated**: July 5, 2026
**Version**: 1.0.0
