import { create } from "zustand";

/*
  Global store for managing todos state.
  This improves scalability and avoids prop drilling.
*/

export const useTodoStore = create((set) => ({
  todos: [],

  // Set all todos
  setTodos: (todos) => set({ todos }),

  // Add todo locally (Optimistic UI)
  addTodo: (todo) =>
    set((state) => ({
      todos: [todo, ...state.todos],
    })),

  // Update todo locally
  updateTodo: (id, updatedData) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, ...updatedData } : t,
      ),
    })),

  // Delete todo locally
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));
